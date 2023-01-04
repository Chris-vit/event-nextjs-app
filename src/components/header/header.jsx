import Image from 'next/image';
import Link from 'next/link';

export const Header = () => {
    return (
        <header>
            <div>
                <div className='topNav'>
                    <Image src={'/images/ticket.png'} height={50} width={50}></Image>
                    <nav>
                        <ul>
                            <li> <Link href='/'>Home</Link> </li>
                            <li><Link href='/events'>Events</Link></li>
                            <li><Link href='/about_us'>About Us</Link></li>
                        </ul>


                    </nav></div>
                <h1>The Best Event booking site</h1></div>
        </header>
    )
}