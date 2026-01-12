import Nav from '../../Components/Nav';
import Footer from '../../Components/Footer';
import ContactClient from '@/Components/ContactClient';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
    title: 'Contacte-nos',
    description: 'Contacte a NEUTRU — envie uma mensagem por formulário ou por email para iniciar um projecto.',
    path: '/contact',
    image: '/og-contact.png',
    keywords: ['contacto', 'contacte-nos', 'neutru', 'email'],
});

export default function ContactPage() {
    return (
        <>
            <Nav />
            <ContactClient />
            <Footer />
        </>
    );
}
