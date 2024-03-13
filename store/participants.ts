import { createMockParticipants } from "@/utils/helpers";
import { create } from "zustand";
import { produce } from "immer";
import { Participant } from "@/types";

type ParticipantsStore = {
  participants: Array<Participant>;
  createParticipants: (count?: number) => void;
  updateParticipantAudio: (id: number, audio: boolean) => void;
  updateParticipantVideo: (id: number, video: boolean) => void;
  removeParticipant: (id: number) => void;
  addParticipant: () => void;
};

const useParticipantsStore = create<ParticipantsStore>((set) => ({
  participants: [],
  createParticipants: (count: number = 25) => {
    set({ participants: createMockParticipants(count) });
  },
  updateParticipantAudio: (id: number, audio: boolean) => {
    set(
      produce((state) => {
        const participantIndex = state.participants.findIndex(
          (p: Participant) => p.id === id,
        );
        if (participantIndex > -1) {
          state.participants[participantIndex].audio = audio;
        }
      }),
    );
  },
  updateParticipantVideo: (id: number, video: boolean) => {
    set(
      produce((state) => {
        const participantIndex = state.participants.findIndex(
          (p: Participant) => p.id === id,
        );
        if (participantIndex > -1) {
          state.participants[participantIndex].video = video;
        }
      }),
    );
  },
  removeParticipant: (id: number) => {
    set((state) => {
      return {
        participants: state.participants.filter((p) => p.id !== id),
      };
    });
  },
  addParticipant: () => {
    set((state) => {
      const newParticipant = createMockParticipants(1)[0];

      return {
        participants: [
          ...state.participants,
          {
            ...newParticipant,
            id: state.participants.length + 1,
            name: `User ${state.participants.length + 1}`,
          },
        ],
      };
    });
  },
}));

export default useParticipantsStore;
