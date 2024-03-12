import { Participant } from "@/types";
import { MAX_PARTICIPANTS } from "./constants";

/**
 * Makes minimum changes to the oldArray to match the newArray.
 * @param oldArray - The original array to be modified.
 * @param newArray - The new array to match.
 * @returns The modified oldArray.
 */
function makeMinimumChanges(
  oldArray: Array<Participant>,
  newArray: Array<Participant>,
) {
  const arr1Set = new Set(oldArray.map((participant) => participant.id));
  const arr2Set = new Set(newArray.map((participant) => participant.id));

  for (let element of arr1Set) {
    if (!arr2Set.has(element)) {
      oldArray.splice(
        oldArray.findIndex((p) => p.id === element),
        1,
      );
    }
  }

  for (let element of arr2Set) {
    if (!arr1Set.has(element)) {
      const participant = newArray.find((p) => p.id === element);
      if (participant) oldArray.push(participant);
    }
  }

  return oldArray;
}

/**
 * Creates a grid of participants to be shown in a video conference.
 * @param bothAudioVideoOn - Participants with both audio and video on.
 * @param audioOrVideoOn - Participants with either audio or video on.
 * @param others - Other participants.
 * @param currentUser - The current user.
 * @returns participants to show.
 */
export const createGrid = (() => {
  const previousBothAudioVideoOn: Array<Participant> = [];
  const previousAudioOrVideoOn: Array<Participant> = [];
  const previousOthers: Array<Participant> = [];

  return (
    bothAudioVideoOn: Array<Participant>,
    audioOrVideoOn: Array<Participant>,
    others: Array<Participant>,
    currentUser: Participant,
  ) => {
    const participantsToShow = [];
    let gridParticipants = 0;
    let i = 0;

    const newBothAudioVideoOn = makeMinimumChanges(
      previousBothAudioVideoOn,
      bothAudioVideoOn,
    );
    const newAudioOrVideoOn = makeMinimumChanges(
      previousAudioOrVideoOn,
      audioOrVideoOn,
    );
    const newOthers = makeMinimumChanges(previousOthers, others);

    while (
      gridParticipants < MAX_PARTICIPANTS - 2 &&
      i < newBothAudioVideoOn.length
    ) {
      participantsToShow.push(newBothAudioVideoOn[i]);
      gridParticipants++;
      i++;
    }
    i = 0;
    while (
      gridParticipants < MAX_PARTICIPANTS - 2 &&
      i < newAudioOrVideoOn.length
    ) {
      participantsToShow.push(newAudioOrVideoOn[i]);
      gridParticipants++;
      i++;
    }

    if (participantsToShow.length < MAX_PARTICIPANTS - 1) {
      participantsToShow.push(currentUser);
      gridParticipants++;
    }
    i = 0;
    while (gridParticipants < MAX_PARTICIPANTS - 2 && i < newOthers.length) {
      participantsToShow.push(newOthers[i]);
      gridParticipants++;
      i++;
    }
    return participantsToShow;
  };
})();
