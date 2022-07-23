import SearchFormController from "controllers/FormControllers/SearchFormController";
import { Card, CardContent, Typography, Box, List, Pagination } from "@mui/material";
import { ListQuestion, PaginationEngine } from "components";
import { useEffect, useState } from "react";
import { useForm } from "contexts";
import NoQuestions from "components/NoQuestions";
export default function Search() {
    const {search, setSearch} = useForm()

    const [questionSet, setQuestionSet] = useState([]);



    const [currentPage, setCurrentPage] = useState(1);
    const count = 3;

    useEffect(()=>{
        handleSubmit(search)
    }, [search, setSearch])

    function handleSubmit(data){
        setQuestionSet(data)
    }

    function handlePageChange(_, value) {
        setCurrentPage(() => value);
    }

    function getComponents() {
        if(questionSet.length > 0){
            return questionSet.map((question) => (
                <ListQuestion
                    question={question}
                    key={question.question_id}
                />
            ));
        }else{
            return 0;
        }
        
    }
    
    return(
        <div>
            <Card>
                <CardContent>
                    <Typography variant = "h3" align="center">Search</Typography>
                    <SearchFormController/>
                </CardContent>
            </Card>

            
            <List sx={{ pl: 2, pr: 2 }}>
                <PaginationEngine
                    components={getComponents()}
                    page={currentPage}
                    count={count}
                />
            </List>
            <Box display='flex' justifyContent='center' sx={{ padding: '1vh' }}>
                <Pagination
                    count={Math.ceil(questionSet.length / count)}
                    onChange={handlePageChange}
                    page={currentPage}
                    style={{}}
                />
            </Box>

        </div>
    )
           
    }          
