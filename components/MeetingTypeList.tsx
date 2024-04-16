"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import HomeCard from "./HomeCard";
import MeetingModal from "./MeetingModal";
import { Textarea } from "./ui/textarea";
import ReactDatePicker from "react-datepicker";

import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [callInfo, setCallInfo] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetail, setCallDetail] = useState<Call>();
  const { toast } = useToast();

  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      if (!callInfo.dateTime) {
        toast({
          title: "Please select date and time",
        });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) throw new Error("Failed to create call");

      const startsAt =
        callInfo.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = callInfo.description || "Instant meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetail(call);

      if (!callInfo.description) {
        router.push(`/meeting/${call.id}`);
      }

      toast({
        title: "Meeting created successfully",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to create meeting",
      });
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`;

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

      {!callDetail ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label
              htmlFor="description"
              className="text-base font-normal leading-[22px] text-sky-2"
            >
              Add a description
            </label>
            <Textarea
              className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) => {
                setCallInfo({ ...callInfo, description: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <label
              htmlFor="date"
              className="text-base font-normal leading-[22px] text-sky-2"
            >
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={callInfo.dateTime}
              onChange={(date) => setCallInfo({ ...callInfo, dateTime: date! })}
              showTimeSelect
              timeIntervals={30}
              timeFormat="HH:MM"
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className=" w-full rounded p-2 border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          className="text-center"
          buttonText="Copy Meeting Link"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Link copied" });
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
        />
      )}
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
