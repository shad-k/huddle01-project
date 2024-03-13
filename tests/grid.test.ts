import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import { createGrid } from "@/utils/grid";
import { Participant } from "@/types";

describe("createGrid", () => {
  it("should render correct number of participants", () => {
    const mockParticipants: Array<Participant> = [
      { id: 1, name: "Participant 1", audio: false, video: false },
      { id: 2, name: "Participant 2", audio: false, video: false },
      // Add more mock participants as needed
    ];
    const mockToggleSidebar = jest.fn();

    const { getAllByTestId } = render(
      createGrid(mockParticipants, mockParticipants.length, mockToggleSidebar),
    );

    expect(getAllByTestId("participant").length).toBe(mockParticipants.length);
  });

  it("should call toggleSidebar when the button is clicked", () => {
    const mockParticipants: Array<Participant> = new Array(50)
      .fill({})
      .map((_, i) => ({
        id: i,
        name: `Participant ${i}`,
        audio: false,
        video: false,
      }));
    const mockToggleSidebar = jest.fn();

    const { getByText } = render(
      createGrid(mockParticipants, mockParticipants.length, mockToggleSidebar),
    );

    fireEvent.click(getByText(`+${mockParticipants.length - 49}`));

    expect(mockToggleSidebar).toHaveBeenCalled();
  });
});
