import { Card, CardContent, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { SearchForm } from 'controllers/FormControllers';
import { PaginatedList } from 'controllers';
import { ListQuestion } from 'components';
import { searchQuestions } from 'services/questionsServices';
import { useEffect } from 'react';

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams()
    useEffect(()=>{
        setSearchParams()
    }, [])


    const getData = async () => {
        let match = {};
        let regexMatch = {}
        let time ={};
        let newdate = searchParams.get('createdAt');
        
        if(newdate){
            newdate = new Date(newdate)
            time["$gte"] = parseInt(newdate.getTime());
            newdate.setDate(newdate.getDate() + 1)
            time["$lte"] = newdate.getTime()
            match = JSON.stringify({"createdAt" : time})
        }
        

        

       
        
        if(searchParams.get('creator')){regexMatch["creator"] = searchParams.get('creator')};
        if(searchParams.get('text')){
            const fields = searchParams.get('text');

            let arr = fields.split(" ")
            let matchString = "";

            for(var i = 0; i< arr.length; i++){
                matchString += "(" + arr[i] +  ")" 
                if(i < arr.length-1){
                    matchString += " | "
                }
            }
            
            regexMatch["text"] = matchString + " /gmi";
        };
        if(searchParams.get('title')){
            const fields = searchParams.get('title');

            let arr = fields.split(" ")
            let matchString = "";

            for(var i = 0; i< arr.length; i++){
                matchString += "(" + arr[i] +  ")" 
                if(i < arr.length-1){
                    matchString += " | "
                }
            }
            
            regexMatch["title"] = matchString + " /gi";
           
        };
        
        
   

        const { questions } = await searchQuestions({ regexMatch, match})


        return questions;
    }

    return (
        <div>
            <Card>
                <CardContent>
                    <Typography variant='h3' align='center'>Search</Typography>
                    <SearchForm />
                </CardContent>
            </Card>
            <PaginatedList {...{ Component: ListQuestion, getData }} />;
        </div>
    )
}          
