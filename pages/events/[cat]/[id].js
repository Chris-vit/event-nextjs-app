import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

const EventPage = ({ data }) => {
    const inputEmail = useRef();
    const router = useRouter();
    const [message, setMessage] = useState("")

    const onSubmit = async (e) => {
        e.preventDefault()
        const emailvalue = inputEmail.current.value;
        const eventId = router.query.id;

        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (!emailvalue.match(validRegex)) {
            setMessage('Please introduce a correct email address');
        }

        try {
            const response = await fetch("/api/email_registration", {
                method: "POST", headers: {
                    "Content-Type": "application/json"
                }, body: JSON.stringify({ email: emailvalue, eventId })
            });

            if (!response.ok) throw new Error(`Error: ${response.status}`);
            const data = await response.json();
            setMessage(data.message)
            inputEmail.current.value = "";
        } catch (error) {
            console.log("ERROR", error);
        }

    }
    return (
        <div className='event_single_page'>
            <Image src={data.image} width={1000} height={500} alt={data.title}></Image>
            <h1> {data.title}</h1>
            <p>{data.description}</p>
            <form onSubmit={onSubmit} className="email_registration">
                <label>Register for this Event now! </label>
                <input ref={inputEmail} type="email" id="email" /><button type='submit'>Submit </button>
                <p>{message}</p>
            </form>

        </div>
    )
}

export default EventPage;

export async function getStaticPaths() {

    const data = await import('/data/data.json');
    const { allEvents } = data;

    const allPaths = allEvents.map((path) => {
        return {
            params: {
                cat: path.city,
                id: path.id     // because the name of the file in id
            }
        }
    })

    return {
        paths: allPaths, fallback: false
    }
}

export async function getStaticProps(context) {
    // console.log(context);
    const { allEvents } = await import('/data/data.json');
    const id = context.params.id;
    const loc = context.params.city;
    const events = allEvents.find(ev => ev.id === id);
    // console.log(events);
    return { props: { data: events } }
}