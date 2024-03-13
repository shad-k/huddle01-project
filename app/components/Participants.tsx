"use client";
import useParticipantsStore from "@/store/participants";
import { Participant } from "@/types";
import { CURRENT_USER, MAX_PARTICIPANTS } from "@/utils/constants";
import { createPriority } from "@/utils/priority";
import { useEffect, useMemo } from "react";
import DesktopGrid from "./GridLayouts/DesktopGrid";
import MobileGrid from "./GridLayouts/MobileGrid";
import TabletGrid from "./GridLayouts/TabletGrid";

const Participants = () => {
  const participants = useParticipantsStore((state) => state.participants);
  const createParticipants = useParticipantsStore(
    (state) => state.createParticipants,
  );

  useEffect(() => {
    // Creates mock participants
    createParticipants();
  }, [createParticipants]);

  // Get participants with both audio and video on, participants with either audio or video on, and others
  const { bothAudioVideoOn, audioOrVideoOn, others } = useMemo(() => {
    const bothAudioVideoOn: Array<Participant> = [];
    const audioOrVideoOn: Array<Participant> = [];
    const others: Array<Participant> = [];
    participants.forEach((participant) => {
      if (participant.audio && participant.video) {
        bothAudioVideoOn.push(participant);
      } else if (participant.audio || participant.video) {
        audioOrVideoOn.push(participant);
      } else {
        others.push(participant);
      }
    });
    return {
      bothAudioVideoOn,
      audioOrVideoOn,
      others,
    };
  }, [participants]);

  // To accommodate the current user, we need to show one less participant
  const MAX_PARTICIPANTS_TO_SHOW = MAX_PARTICIPANTS - 1;

  /**
   * Get all participants that have both audio and video on.
   * If there are more than the maximum participants to show, slice the array.
   * Slice all the arrays till MAX_PARTICIPANTS_TO_SHOW is reached.
   */
  const bothAudioVideoOnParticipants = bothAudioVideoOn.slice(
    0,
    MAX_PARTICIPANTS_TO_SHOW,
  );
  const audioOrVideoOnParticipants = audioOrVideoOn.slice(
    0,
    MAX_PARTICIPANTS_TO_SHOW - bothAudioVideoOnParticipants.length,
  );
  const otherParticipants = others.slice(
    0,
    MAX_PARTICIPANTS_TO_SHOW -
      bothAudioVideoOnParticipants.length -
      audioOrVideoOnParticipants.length,
  );

  // Final list of participants to show
  const participantsToShow = createPriority(
    bothAudioVideoOnParticipants,
    audioOrVideoOnParticipants,
    otherParticipants,
    CURRENT_USER,
  );

  return (
    <>
      <DesktopGrid
        participantsToShow={participantsToShow}
        totalParticipants={participants.length}
      />
      <TabletGrid
        participantsToShow={participantsToShow}
        totalParticipants={participants.length}
      />
      <MobileGrid
        participantsToShow={participantsToShow}
        totalParticipants={participants.length}
      />
    </>
  );
};

export default Participants;
