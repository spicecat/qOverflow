//This for Q and A
import { Answer, PaginatedList } from '.'

export default function AnswersList({ answers, count }) {
    return <PaginatedList count={count} Component={Answer} data={answers} />;
}