import React from "react";
import loading from 'E:/React/newsapp/src/loading.gif';

const Spinner =() =>{
        return(
            <div className="text-center">
            <img className="my-3" src={loading} alt="Loadimg"/>
            </div>
        )
}
export default Spinner

// export class Spinner extends Component{
//     render(){
//         return(
//             <div className="text-center">
//             <img className="my-3" src={loading} alt="Loadimg"/>
//             </div>
//         )
//     }
// }