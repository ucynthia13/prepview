import React from 'react';
import dayjs from "dayjs";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import TechStack from "@/components/page-components/TechStack";
import { Calendar, Calendar1Icon, CalendarDays, Star } from 'lucide-react';


const InterviewCard = ({interviewId, coverImage, role, type, techstack, createdAt} : InterviewCardProps) => {
    const feedback = null as Feedback | null;
    const normalizedType = /mix/gi.test(type) ? "mixed" : type;
    const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format('MMM D, YYYY');
    return (
        <div className="border border-input rounded-xl max-w-[360px] max-sm:w-full">
            <div className="card-interview">
                <div>
                    <div className="absolute top-0 right-0 w-fit px-3 py-2 rounded-bl-lg bg-primary">
                        <p className="badge-text">{normalizedType}</p>
                    </div>
                    <Image src={coverImage} alt="Interview Icon" width={40} height={40} className="rounded-full object-fit size-[60px]"/>
                    <h3 className="mt-4 capitalize text-lg">{role} Interview</h3>
                    <div className="flex flex-row gap-5 mt-4">
                        <div className="flex flex-row gap-1 justify-center items-center">
                            <CalendarDays className="size-5 text-blue-500" />
                            <p className="text-sm">{formattedDate}</p>
                        </div>
                        <div className="flex flex-row justify-center items-center gap-2">
                            <Star className="size-5 text-yellow-400 fill-current" />
                            <p>{feedback?.totalScore || '---'}/100</p>
                        </div>
                    </div>
                    <p className="line-clamp-2 mt-5 text-sm text-muted-foreground">
                        {feedback?.finalAssessment || `You haven't taken this interview yet`}
                    </p>
                    <div className="flex flex-row justify-between mt-5">
                        <TechStack techStack={techstack}/>
                        <Button type="submit" asChild className="rounded-full px-4 py-2 bg-primary">
                            <Link href={feedback? `/interview/${interviewId}/feedback` : `/interview/${interviewId}`}>View Interview</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InterviewCard;