import React from 'react';
import dayjs from "dayjs";
import Image from "next/image";
import {getRandomInterviewCover} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import TechStack from "@/components/page-components/TechStack";


const InterviewCard = ({interviewId, role, type, techstack, createdAt} : InterviewCardProps) => {
    const feedback = null as Feedback | null;
    const normalizedType = /mix/gi.test(type) ? "mixed" : type;
    const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format('MMM D, YYYY');
    return (
        <div className="card-border max-w-[360px] max-sm:w-full">
            <div className="card-interview">
                <div>
                    <div className="absolute top-0 right-0 w-fit px-6 py-2 rounded-bl-lg bg-light-600">
                        <p className="badge-text">{normalizedType}</p>
                    </div>
                    <Image src={getRandomInterviewCover()} alt="Interview Icon" width={40} height={40} className="rounded-full object-fit size-[90px]"/>
                    <h3 className="mt-3 capitalize">{role} Interview</h3>
                    <div className="flex flex-row gap-5 mt-3">
                        <div className="flex flex-row gap-2">
                            <Image src="/calendar.svg" alt="Calendar" width={22} height={22} />
                            <p>{formattedDate}</p>
                        </div>
                        <div className="flex flex-row gap-2">
                            <Image src="/star.svg" alt="Star" width={22} height={22}  />
                            <p>{feedback?.totalScore || '---'}/100</p>
                        </div>
                    </div>
                    <p className="line-clamp-2 mt-5">
                        {feedback?.finalAssessment || `You haven&apos;t taken this interview yet`}
                    </p>
                    <div className="flex flex-row justify-between mt-5">
                        <TechStack techStack={techstack}/>
                        <Button type="submit" asChild className="rounded-full px-4 py-2 bg-light-100">
                            <Link href={feedback? `/interview/${interviewId}/feedback` : `/interview/${interviewId}`}>View Interview</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InterviewCard;