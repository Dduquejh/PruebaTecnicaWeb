import { useState, useEffect } from "react";
import { Player } from "./Player";
import { NBAPlayers } from "../models/NBAPlayers.model";

export const ShowPlayer = () => {
    const [players, setPlayers] = useState<NBAPlayers[]>([]);
    const [matchingPairs, setMatchingPairs] = useState<NBAPlayers[][]>([]);
    const [aux, setAux] = useState<number | "">("");

    const getPlayers = async () => {
        const response = await fetch('https://mach-eight.uc.r.appspot.com/')
        const data = await response.json();
        setPlayers(data.values);
        console.log(data.values);
    }

    useEffect(() => {
        getPlayers();
    }, []);

    const findMatchingPairs = (targetHeight: number) => {
        const matchingPairs: NBAPlayers[][] = [];
        for(let i=0; i<players.length; i++){
            for(let j=i+1; j<players.length; j++){
                if(Number(players[i].h_in) + Number(players[j].h_in) === targetHeight){
                    matchingPairs.push([players[i], players[j]]);
                }
            }
        }
        setMatchingPairs(matchingPairs);
    }

    return (
        <div className="container">
            <h1>Matching pairs</h1>
            <input
                type="number"
                value={aux}
                placeholder="Ingrese la suma de las alturas"
                onChange={(e) => {
                    const targetHeight = Number(e.target.value);
                    setAux(targetHeight);
                    findMatchingPairs(targetHeight);
                }}
            />

            {matchingPairs.length > 0 ? (
                matchingPairs.map((pair, index) => {
                    return (
                        <div key={index} className="players-pair">
                            <Player player={pair[0]} />
                            <span className="separator">-</span>
                            <Player player={pair[1]} />
                        </div>
                    );
                })
            ) : (
                <p>No matching pairs found.</p>
            )}

        </div> 
    );

}
