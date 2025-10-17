export type FlatRow = number[]
export type ColumnRow = number[][]
export type Row = FlatRow | ColumnRow

export type SkillsLayoutByBreakpoint = {
  xl: Row[]
  lg: Row[]
  md: Row[]
  sm: Row[]
}

export type WidthOverridesByBreakpoint = {
  xl?: Record<number, string>
  lg?: Record<number, string>
  md?: Record<number, string>
  sm?: Record<number, string>
}

export const skillsLayoutByBp: SkillsLayoutByBreakpoint = {
  xl: [
    [0, 1, 2],
    [3, 4],
  ],
  lg: [
    [0, 1,],
    [2, 3],
    [4],
  ],
  md: [
    [0, 1],
    [2, 3, 4],
  ],
  sm: [
    [0],
    [1],
    [2],
    [3],
    [4],
  ],
}

export const widthOverridesByBp: WidthOverridesByBreakpoint = {
  xl: {
    0: "w-[36%]",
    2: "w-[35%]",
    1: "w-[21%]",
    3: "w-[52%]",
    4: "w-[42%]",
  },
  lg: {
    0: "w-[63%]",
    1: "w-[34.9%]",
    2: "w-[48.9%]",
    3: "w-[48.9%]",
    4: "w-[100%]",
  },
  md: {
    0: "w-[56%]",
    1: "w-[40.5%]",
    2: "w-[57.7%]",
    3: "w-[39%]",
    4: "w-full",
  },
  sm: {
    0: "w-full",
    1: "w-full",
    2: "w-full",
    3: "w-full",
    4: "w-full",
  },
}

// Container wrapper classes (edit once to tweak overall max width and fractions per breakpoint)
// Example: include max-w and fractional widths like xl:w-1/2 to only occupy half of the total page width on xl
export const containerWrapperClass =
  "xl:max-w-6xl lg:max-w-[975px] md:max-w-[730px] sm:max-w-xl max-w-[370px] xl:w-full lg:w-full md:w-full sm:w-full w-full"

  // Column width ratios per breakpoint (controls how wide left/right columns are)
export const columnWidthOverridesByBp = {
  xl: ["flex-[1]", "flex-[1]"], // left wider than right
  lg: ["flex-[1]", "flex-[1]"],     // equal columns
  md: ["flex-[1]", "flex-[1]"],     // equal columns
  sm: ["flex-[1]", "flex-[1]"],     // single-column layout anyway
}



