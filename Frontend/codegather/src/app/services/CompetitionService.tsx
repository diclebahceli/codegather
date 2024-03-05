// import { axios } from 'axios'; // Assuming you're using Axios for API calls
// const API_URL = 'https://your-api-endpoint.com/competitions'; // Replace with your actual API endpoint
// export const getCompetitions = async (): Promise<Competition[]> => {
//   try {
//     const response = await axios.get(API_URL);
//     return response.data as Competition[]; // Type cast for safety
//   } catch (error) {
//     console.error('Error fetching competitions:', error);
//     throw error; // Re-throw the error for handling in the component
//   }
// };

import { Competition } from "../models/Competition";

const competitions: Competition[] = [
        {
            id: 1,
            name: "Competition 1",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed blandit libero. Sed mollis ante non velit sollicitudin ornare. Pellentesque.",
            startDate: "Today",
            endDate: "Tomorrow",
            imageUrl: "test"
        },
        {
            id: 2,
            name: "Competition 2",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed blandit libero. Sed mollis ante non velit sollicitudin ornare. Pellentesque.",
            startDate: "Today",
            endDate: "Tomorrow",
            imageUrl: "test"
        },
        {
            id: 3,
            name: "Competition 3",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed blandit libero. Sed mollis ante non velit sollicitudin ornare. Pellentesque.",
            startDate: "Today",
            endDate: "Tomorrow",
            imageUrl: "test"
        },
        {
            id: 4,
            name: "Competition 4",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed blandit libero. Sed mollis ante non velit sollicitudin ornare. Pellentesque.",
            startDate: "Today",
            endDate: "Tomorrow",
            imageUrl: "test"
        },
        {
            id: 5,
            name: "Competition 5",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed blandit libero. Sed mollis ante non velit sollicitudin ornare. Pellentesque.",
            startDate: "Today",
            endDate: "Tomorrow",
            imageUrl: "test"
        },
        {
            id: 6,
            name: "Competition 6",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed blandit libero. Sed mollis ante non velit sollicitudin ornare. Pellentesque.",
            startDate: "Today",
            endDate: "Tomorrow",
            imageUrl: "test"
        },
        {
            id: 7,
            name: "Competition 7",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed blandit libero. Sed mollis ante non velit sollicitudin ornare. Pellentesque.",
            startDate: "Today",
            endDate: "Tomorrow",
            imageUrl: "test"
        },
        {
            id: 8,
            name: "Competition 8",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed blandit libero. Sed mollis ante non velit sollicitudin ornare. Pellentesque.",
            startDate: "Today",
            endDate: "Tomorrow",
            imageUrl: "test"
        },
        {
            id: 9,
            name: "Competition 9",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed blandit libero. Sed mollis ante non velit sollicitudin ornare. Pellentesque.",
            startDate: "Today",
            endDate: "Tomorrow",
            imageUrl: "test"
        }
    ]


export const getAllCompetitions = (): Competition[] => {
    return competitions;
};

export const getCompetitionById = (id: number): Competition | undefined => {
    return competitions.find(comp => comp.id === id);

}
