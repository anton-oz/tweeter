import { gql } from '@apollo/client';

export const GET_QUESTION = gql`
    query question {
        question {
            question
        }
    }
`;