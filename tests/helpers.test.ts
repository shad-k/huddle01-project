import { random, createMockParticipants } from "../utils/helpers";

describe("random", () => {
  it("should generate a random number between min and max", () => {
    const result = random(1, 10);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(10);
  });
});

describe("createMockParticipants", () => {
  it("should create an array of mock participants with the specified count", () => {
    const count = 5;
    const participants = createMockParticipants(count);
    expect(participants).toHaveLength(count);
    participants.forEach((participant) => {
      expect(participant).toHaveProperty("name");
      expect(participant).toHaveProperty("id");
      expect(participant).toHaveProperty("audio");
      expect(participant).toHaveProperty("video");
    });
  });
});
