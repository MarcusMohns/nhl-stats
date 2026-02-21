import { PlayerType, StandingsGoalieType } from "@/app/types";
// todo check playertpyye goalietype adn skatertype
import PlayerCard from "./player-card";

const PlayerCardList = ({
  players,
}: {
  players: PlayerType[] | StandingsGoalieType[];
}) => (
  <div>
    {players.map((player) => (
      <PlayerCard player={player} key={player.id} />
    ))}
  </div>
);

export default PlayerCardList;
