"use client";

import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();

  const createMeeting = () => {};

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        iconUrl="/icons/add-meeting.svg"
        title="New Meeting"
        caption="Start an instant meeting"
        className="bg-orange-1"
        handleClick={() => {
          setMeetingState("isInstantMeeting");
        }}
      />
      <HomeCard
        iconUrl="/icons/schedule.svg"
        title="Schedule Meeting"
        caption="Plan your meeting"
        className="bg-blue-1"
        handleClick={() => {
          setMeetingState("isScheduleMeeting");
        }}
      />
      <HomeCard
        iconUrl="/icons/recordings.svg"
        title="View Recordings"
        caption="Check out on previous meetings"
        className="bg-purple-1"
        handleClick={() => {
          router.push("/recordings");
        }}
      />
      <HomeCard
        iconUrl="/icons/join-meeting.svg"
        title="Join Meeting"
        caption="Via invitation link"
        className="bg-yellow-1"
        handleClick={() => {
          setMeetingState("isJoiningMeeting");
        }}
      />

      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
