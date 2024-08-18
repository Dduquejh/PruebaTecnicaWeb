import { NBAPlayers } from "../models/NBAPlayers.model";
interface PlayerProps {
    player: NBAPlayers;
}

export const Player = ({ player }: PlayerProps) => {
    return (
        <div>
            <h3>{player.first_name} {player.last_name}</h3>
        </div>
    )
}