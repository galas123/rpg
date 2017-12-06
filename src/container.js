import {} from './constants/mechanics';
import React, {Component} from 'react';
import './App.css';
import Board from './components/board';
import FogOfWar from './components/fogOfWar';
import StatsFrame from './components/statsFrame';
import {setRandomItems} from './AC/setRandomItems';
import {isLooser, isWinner, attack, dungeonNumber, heart, level, nextLevel, weapon} from './selectors/selectors';
import {connect} from 'react-redux';


class Container extends Component {

  componentWillMount(){
    const {setRandomItems}=this.props;
    setRandomItems();
  }

  render() {
    const {heart, weapon, attack, level, nextLevel,dungeonNumber, isLooser, isWinner}=this.props;
    let stopGamePic1=null;
    let stopGamePic2=null;

    if (isLooser||isWinner){
      stopGamePic1=(<div className="rpg-stop-game"/>)
        }

        if (isLooser) {
          stopGamePic2=
            (<div className="rpg-looser">
              You are dead!
            </div>);
        }
        if (isWinner){
          stopGamePic2=
            (<div className="rpg-winner">
              You win!
            </div>);
        }
        return (
        <div className='rpg'>
          {stopGamePic1}
          {stopGamePic2}
          <h1 className="rpg_caption">Hero of Dungeon</h1>
          <h2 className="rpg_goal-name">Kill the boss in dungeon 4</h2>
          <div className="wrapper">
            <StatsFrame heart={heart} weapon={weapon} attack={attack}
                        level={level} nextLevel={nextLevel} dungeonNumber={dungeonNumber} />
            <Board classname={"game-board"}/>
            <FogOfWar/>
          </div>
        </div>
        );
        }
        }
        const mapStateToProps = state=> {
          return {
          isLooser:isLooser(state),
          isWinner:isWinner(state),
          heart: heart(state),
          attack:attack(state),
          weapon   : weapon(state),
          level: level(state),
          nextLevel    : nextLevel(state),
          dungeonNumber :dungeonNumber(state)
        };
        }

        export default connect(mapStateToProps, {setRandomItems})(Container);
