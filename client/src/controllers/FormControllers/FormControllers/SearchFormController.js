import { Form } from ".";
import { searchFields } from "services/fields";
import { searchSchema } from "services/schemas";
import { useForm } from "contexts";
import { searchQuestions } from "services/questionsServices";
import { useEffect } from "react";

export default function SearchFormController(){

    useEffect(()=>{
        searchQuestions("", "").then( (res) => {
            setSearch(res.questions)
        })
    },[])

    const {returnRegexQuery, setSearch} = useForm()
 
    const search = (fields) =>{
        //regex match and all of that
        
       

        let match = returnRegexQuery(fields);

        searchQuestions(match, "").then( (res) => {
            setSearch(res.questions)
        })
        
    }
    return(
        Form({
            fields: searchFields,
            onSubmit: search,
            validationSchema: searchSchema,
        })
    )

}