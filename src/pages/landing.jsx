import { Link } from 'react-router-dom';
import '../index.css';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import companies from '../data/companies.json';
import faqs from '../data/faq.json';
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


const LandingPage = () => {
    return (
        <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
            <section className="text-center">
                <h1 className="text-4xl sm:text-6xl lg:text-8xl font-extrabold  flex flex-col items-center justify-center">
                    <span className="gradient-title inline-block pb-4">
                        Find your dream job
                    </span>
                    <span className="flex items-center gradient-title pb-4">
                        <span className="inline-block">and get</span>
                        <img src="./HireUp-Man.png" className="h-12 sm:h-24 lg:h-32 ml-5" alt="" />
                        <span className="inline-block text-4xl sm:text-5xl lg:text-7xl">HireUp</span>
                    </span>
                </h1>
                <p className='text-gray-300 sm:mt-4 text-xs sm:text-xl'>
                    Explore thousands of job listings or find the perfect candinate
                </p>

            </section>
            <div className='flex justify-center gap-2'>
                <Link to="/jobs">
                    <Button variant="blue" size="xl">Find Jobs</Button>
                </Link>
                <Link to="/post-job">
                    <Button variant="destructive" size="xl">Post Job</Button>
                </Link>
            </div>


            <Carousel plugins={[
                Autoplay({ delay: 2000 })
            ]} className="w-full py-10">
                <CarouselContent className="flex gap-5 sm:gap-15 items-center">
                    {companies.map(({ name, id, path }) => {
                        return (
                            <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
                                <img src={path} alt={name} className='h-9 sm:h-14 object-contain' />


                            </CarouselItem>
                        );
                    })}
                </CarouselContent>

            </Carousel>


            {/* banner */}
            <img src="/banner.jpeg" alt="Banner" className='w-full' />

            <section className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <Card>
                    <CardHeader>
                        <CardTitle>Job Seekers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Search and apply for jobs, track applications and more.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>For Employers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Post jobs, manage applications, and find the best candidates.</p>
                    </CardContent>
                </Card>
            </section>

            <Accordion type="single" collapsible className="w-full max-w-7xl mx-auto p-1 space-y-2">
                {faqs.map((faq, index) => (
                    <AccordionItem
                        key={index}
                        value={`item-${index + 1}`}
                        className="border rounded-lg overflow-hidden"
                    >
                        <AccordionTrigger className="px-4 py-3 flex justify-between items-center font-medium text-lg hover:no-underline hover:opacity-80 transition-opacity">
                            {faq.question}
                            <span className="ml-2 text-xl font-bold transition-transform duration-300 data-[state=open]:rotate-45">
                            </span>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 py-3 text-base">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>


        </main>
    )
}

export default LandingPage
