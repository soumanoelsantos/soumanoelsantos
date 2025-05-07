
export interface SwotItem {
  id: string;
  text: string;
}

export interface SwotData {
  strengths: SwotItem[];
  weaknesses: SwotItem[];
  opportunities: SwotItem[];
  threats: SwotItem[];
}

export const defaultSwotData: SwotData = {
  strengths: [
    { id: "s1", text: "" },
    { id: "s2", text: "" },
    { id: "s3", text: "" },
  ],
  weaknesses: [
    { id: "w1", text: "" },
    { id: "w2", text: "" },
    { id: "w3", text: "" },
  ],
  opportunities: [
    { id: "o1", text: "" },
    { id: "o2", text: "" },
    { id: "o3", text: "" },
  ],
  threats: [
    { id: "t1", text: "" },
    { id: "t2", text: "" },
    { id: "t3", text: "" },
  ],
};
