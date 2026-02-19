import { PlayerType, GoalieType } from "@/app/types";
import PlayerCard from "./player-card";

const PlayerCardList = ({
  players,
}: {
  players: PlayerType[] | GoalieType[];
}) => (
  <div>
    {players.map((player) => (
      <PlayerCard player={player} key={player.id} />
    ))}
  </div>
);

export default PlayerCardList;
