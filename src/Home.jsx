import React from 'react';
import { Link } from 'react-router-dom';
import GroupCard from './components/GroupCard';
import './index.css'

export default function Home () {
    const associations = [
        { associationid: '1', name: 'Mikin purjehdusseura' },
        { associationid: '2', name: 'Paketointikerho' },
        { associationid: '3', name: 'Pennin venyttäjät' },
        { associationid: '9', name: 'Karhukopla' }
      ];
      return (
        <div>
          <div className="home-container">
            <h1>Löydä intohimosi</h1>
            <h4>
              HobbyMatch tarjoaa ainutlaatuisen alustan, jonka avulla voit löytää ja liittyä
              erilaisiin harrastusryhmiin ja joukkueisiin omalla alueellasi. Sivustolta löydät
              laajan valikoiman harrastusvaihtoehtoja aina kuntourheilusta taideharrastuksiin.
              Etsitpä sitten jalkapallojoukkuetta, tanssiryhmää tai vaikka lautapelikerhoa,
              HobbyMatch auttaa sinua löytämään samanhenkiset ihmiset ja harrastusporukat.
            </h4>
          <h2>Ryhmät</h2>

          </div>
          <div className="group-card-container">
            {associations.map((association) => (
              <GroupCard key={association.associationid} association={association} />
            ))}
          </div>
        </div>
      );
    }
