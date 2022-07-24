import {SearchForm} from 'controllers/FormControllers';
import { Card, CardContent, Typography, Box, List, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'contexts';
import { ListQuestion, PaginationEngine } from 'components';

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
    
    return(
        <div>
            <Card>
                <CardContent>
                    <Typography variant = 'h3' align='center'>Search</Typography>
                    <SearchForm />
                </CardContent>
            </Card>

            
            <List sx={{ pl: 2, pr: 2 }}>
                <PaginationEngine
                    components={ListQuestion}
                    count={count}
                    data={questionSet}
                    page={currentPage}
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
