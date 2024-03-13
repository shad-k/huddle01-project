import { createPriority } from "@/utils/priority";
import { Participant } from "@/types";

describe("createPriority", () => {
  it("should return an empty array if all input arrays are empty", () => {
    const bothAudioVideo: Array<Participant> = [];
    const audioOrVideo: Array<Participant> = [];
    const others: Array<Participant> = [];
    const currentUser: Participant = {
      id: 1,
      name: "User 1",
      audio: true,
      video: true,
    };

    const result = createPriority(
      bothAudioVideo,
      audioOrVideo,
      others,
      currentUser,
    );

    expect(result).toEqual([currentUser]);
  });

  it("should prioritize participants with both audio and video on", () => {
    const bothAudioVideo: Array<Participant> = [
      { id: 1, name: "User 1", audio: true, video: true },
      { id: 2, name: "User 2", audio: true, video: true },
    ];
    const audioOrVideo: Array<Participant> = [
      { id: 3, name: "User 3", audio: true, video: false },
      { id: 4, name: "User 4", audio: false, video: true },
    ];
    const others: Array<Participant> = [
      { id: 5, name: "User 5", audio: false, video: false },
      { id: 6, name: "User 6", audio: true, video: true },
    ];
    const currentUser: Participant = {
      id: 7,
      name: "Current User",
      audio: true,
      video: true,
    };

    const result = createPriority(
      bothAudioVideo,
      audioOrVideo,
      others,
      currentUser,
    );

    expect(result).toEqual([
      { id: 1, name: "User 1", audio: true, video: true },
      { id: 2, name: "User 2", audio: true, video: true },
      { id: 3, name: "User 3", audio: true, video: false },
      { id: 4, name: "User 4", audio: false, video: true },
      { id: 7, name: "Current User", audio: true, video: true },
      { id: 5, name: "User 5", audio: false, video: false },
      { id: 6, name: "User 6", audio: true, video: true },
    ]);
  });

  it("should prioritize participants with either audio or video on", () => {
    const bothAudioVideo: Array<Participant> = [];
    const audioOrVideo: Array<Participant> = [
      { id: 1, name: "User 1", audio: true, video: false },
      { id: 2, name: "User 2", audio: false, video: true },
    ];
    const others: Array<Participant> = [
      { id: 3, name: "User 3", audio: false, video: false },
      { id: 4, name: "User 4", audio: false, video: false },
    ];
    const currentUser: Participant = {
      id: 5,
      name: "Current User",
      audio: false,
      video: false,
    };

    const result = createPriority(
      bothAudioVideo,
      audioOrVideo,
      others,
      currentUser,
    );

    expect(result).toEqual([
      { id: 1, name: "User 1", audio: true, video: false },
      { id: 2, name: "User 2", audio: false, video: true },
      { id: 5, name: "Current User", audio: false, video: false },
      { id: 3, name: "User 3", audio: false, video: false },
      { id: 4, name: "User 4", audio: false, video: false },
    ]);
  });

  it("should include other participants after prioritizing", () => {
    const bothAudioVideo: Array<Participant> = [
      { id: 1, name: "User 1", audio: true, video: true },
    ];
    const audioOrVideo: Array<Participant> = [
      { id: 2, name: "User 2", audio: false, video: true },
    ];
    const others: Array<Participant> = [
      { id: 3, name: "User 3", audio: false, video: false },
      { id: 4, name: "User 4", audio: false, video: false },
    ];
    const currentUser: Participant = {
      id: 5,
      name: "Current User",
      audio: false,
      video: false,
    };

    const result = createPriority(
      bothAudioVideo,
      audioOrVideo,
      others,
      currentUser,
    );

    expect(result).toEqual([
      { id: 1, name: "User 1", audio: true, video: true },
      { id: 2, name: "User 2", audio: false, video: true },
      { id: 5, name: "Current User", audio: false, video: false },
      { id: 3, name: "User 3", audio: false, video: false },
      { id: 4, name: "User 4", audio: false, video: false },
    ]);
  });
});
