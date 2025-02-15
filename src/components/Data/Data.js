import { FaUsersGear } from "react-icons/fa6";

export const CardData = [
  {
    title: "Sales",
    color: {
      backGround: "linear-gradient(180deg,#bb67ff 0% ,#c484f3 100%)",
      boxShadow: "0px 10px 20px 0px  #e0c6f5",
    },

    barValue: 70,
    value: "25,970",
    png: <FaUsersGear />,
    series: [
      {
        name: "Expenses",
        data: [10, 25, 15, 30, 12, 15, 20],
      },
    ],
  },
];
