import { createContext, useContext, useState} from "react";

const FormContext = createContext()

export default function FormProvider({ children }){

   

    const [content, setContent] = useState("");

    const [search, setSearch] = useState({});
    
    function returnRegexQuery(fields){
        const newdate = new Date(fields.date);

        let matchObj = {}
        let realMatch = {}
        let time = {}

        let finalString = ""
       
        if(!isNaN(newdate.valueOf()) && fields.date !== ""){
            time["$gte"] = newdate.getTime()
            newdate.setDate(newdate.getDate() + 1)
            time["$lte"] = newdate.getTime()

            realMatch.createdAt =  time
            console.log(realMatch)
        }

        if(fields.creator !== ""){
            realMatch.creator = fields.creator
        }
        if(Object.keys(realMatch).length > 0){
            finalString = "?match=" + encodeURIComponent(JSON.stringify(realMatch));
        }

        if(fields.body !== ""){

            let arr = fields.body.split(" ")
            let matchString = "";

            for(var i = 0; i< arr.length; i++){
                matchString += "(" + arr[i] +  ")" 
                if(i < arr.length-1){
                    matchString += " | "
                }
            }
            matchObj.text = matchString + " /gmi";

        }

        if(fields.search !== ""){
            let arr = fields.search.split(" ")
            let matchString = "";

            for(i = 0; i< arr.length; i++){
                matchString += "(" + arr[i] +  ")" 
                if(i < arr.length-1){
                    matchString += " | "
                }
            }

            matchObj.title = matchString + " /gi";

        }
        
        if(Object.keys(matchObj).length > 0){

            if(finalString === ""){
                finalString += "?regexMatch=" + encodeURIComponent(JSON.stringify(matchObj));
            }else{
                finalString += "&regexMatch=" + encodeURIComponent(JSON.stringify(matchObj));
            }
            
        }
        
        return finalString;

    }

   return(
    <FormContext.Provider
        value = {{
            content, 
            setContent,
            search,
            setSearch,
            returnRegexQuery
          
        }}>

        {children}

    </FormContext.Provider>

   )
    
}

export const useForm = () => useContext(FormContext)