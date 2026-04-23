'use client';

import * as React from 'react';
import Link from 'next/link';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { BriefcaseIcon, LayoutDashboardIcon, LogOutIcon, StarIcon } from 'lucide-react';
import { Button } from '../ui/button';

const interviewTypes: { title: string; href: string; description: string }[] = [
    {
        title: 'Technical Interview',
        href: '/interview?type=technical',
        description: 'Practice coding, system design, and technical problem-solving questions.',
    },
    {
        title: 'Behavioral Interview',
        href: '/interview?type=behavioral',
        description: 'Prepare for situational and culture-fit questions using the STAR method.',
    },
    {
        title: 'Frontend Developer',
        href: '/interview?role=frontend',
        description: 'React, TypeScript, CSS, and frontend architecture questions.',
    },
    {
        title: 'Backend Developer',
        href: '/interview?role=backend',
        description: 'APIs, databases, system design, and server-side concepts.',
    },
    {
        title: 'Fullstack Developer',
        href: '/interview?role=fullstack',
        description: 'End-to-end questions covering both frontend and backend skills.',
    },
    {
        title: 'DevOps Engineer',
        href: '/interview?role=devops',
        description: 'CI/CD, containerization, cloud infrastructure, and monitoring.',
    },
];

function ListItem({ title, children, href, ...props }: React.ComponentPropsWithoutRef<'li'> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link href={href}>
                    <div className="text-sm leading-none font-medium">{title}</div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
                </Link>
            </NavigationMenuLink>
        </li>
    );
}

export default function Navbar() {
    return (
        <div className="w-full flex justify-between items-center px-6 lg:px-12 border-b py-4">
            <Link href="/" className="text-lg font-bold">
                PrepView
            </Link>
            <NavigationMenu viewport={false}>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Home</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                <li className="row-span-3">
                                    <NavigationMenuLink asChild>
                                        <Link
                                            className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                                            href="/"
                                        >
                                            <div className="mt-4 mb-2 text-lg font-medium">PrepView</div>
                                            <p className="text-muted-foreground text-sm leading-tight">
                                                AI-powered mock interviews with instant feedback to get you job-ready.
                                            </p>
                                        </Link>
                                    </NavigationMenuLink>
                                </li>
                                <ListItem href="/interview" title="Start Practicing">
                                    Jump straight into a mock interview tailored to your role and level.
                                </ListItem>
                                <ListItem href="/dashboard" title="Your Dashboard">
                                    View your past interviews, scores, and progress over time.
                                </ListItem>
                                <ListItem href="/feedback" title="Get Feedback">
                                    Review AI-generated feedback and areas for improvement.
                                </ListItem>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Interviews</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                {interviewTypes.map((item) => (
                                    <ListItem key={item.title} title={item.title} href={item.href}>
                                        {item.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Link href="/dashboard">Dashboard</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Levels</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[300px] gap-4">
                                <li>
                                    <NavigationMenuLink asChild>
                                        <Link href="/interview?level=junior">
                                            <div className="font-medium">Junior</div>
                                            <div className="text-muted-foreground">0–2 years experience. Foundational concepts and basics.</div>
                                        </Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href="/interview?level=mid">
                                            <div className="font-medium">Mid-Level</div>
                                            <div className="text-muted-foreground">2–5 years experience. Deeper technical and design questions.</div>
                                        </Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href="/interview?level=senior">
                                            <div className="font-medium">Senior</div>
                                            <div className="text-muted-foreground">5+ years experience. Architecture, leadership, and system design.</div>
                                        </Link>
                                    </NavigationMenuLink>
                                </li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Quick Start</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[200px] gap-4">
                                <li>
                                    <NavigationMenuLink asChild>
                                        <Link href="/interview" className="flex-row items-center gap-2">
                                            <BriefcaseIcon className="size-4" />
                                            New Interview
                                        </Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href="/dashboard" className="flex-row items-center gap-2">
                                            <LayoutDashboardIcon className="size-4" />
                                            My Progress
                                        </Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href="/feedback" className="flex-row items-center gap-2">
                                            <StarIcon className="size-4" />
                                            Latest Feedback
                                        </Link>
                                    </NavigationMenuLink>
                                </li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                </NavigationMenuList>
            </NavigationMenu>
            <Button className="flex items-center gap-2 rounded-full px-4">
                Sign Out
            </Button>
        </div>
    );
}