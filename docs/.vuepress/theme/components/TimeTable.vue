<template lang="html">
  <div class="timetables">
    <div class="timetable-event" v-for="(event, index) in eventList" :key="'event'+index">
      <div class="date">
        {{event.date}}
      </div>
      <div class="time">
        {{event.time}}
      </div>
      <div class="name">
        {{event.title}}
      </div>
      <div class="venue">
        {{event.venue}}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      eventList: [
        {
          date: 'OCT 15-27',
          time: '18:00',
          title: 'Exhibition: “Stay” (2017): an interactive sound exhibition by Sine Wave Orchestra (JP)',
          venue: 'Doreen Blackbox, Areté, Ateneo de Manila University'
        },
        {
          date: 'OCT 15-21',
          time: '13:00-18:00',
          title: 'Residency: Gangan Series Workshop Lab',
          venue: 'Bank Of Singapore, Areté, Ateneo de Manila University'
        },
        {
          date: 'OCT 16-23',
          time: '10:00-18:30',
          title: 'Residency: MusicMakers Hacklab',
          venue: 'Eugenio Jr Makerspace, Areté, Ateneo de Manila University'
        },
        {
          date: 'OCT 16',
          time: '16:00-19:00',
          title: 'Talk: Believe Your Sine Wave: The Sine Wave Orchestra Artist Talk',
          venue: 'Benchan Art Suite, Areté, Ateneo de Manila University'
        },
        {
          date: 'OCT 17',
          time: '13:00-16:00',
          title: 'Workshop: 8-bit Synth',
          venue: 'College ‘79 Creative Collaborative Room, Areté, Ateneo de Manila University'
        },
        {
          date: 'OCT 18',
          time: '13:00-17:00',
          title: 'Workshop: SOUNDTABLE: A History of Soundart ',
          venue: 'College ‘79 Creative Collaborative Room, Areté, Ateneo de Manila University'
        },
        {
          date: 'OCT 21-23',
          time: '14:00-17:00',
          title: 'Workshop: 3D ORGANIC VISION/SOUND: A FILM WORKSHOP by Makino Takashi and Rei hayama (JP)',
          venue: 'College of 66’, Areté, Ateneo de Manila University'
        },
        {
          date: 'OCT 23-24',
          time: '13:00-18:00',
          title: 'Ghost of the Roaming Islands: From 3D Scanned Memories to Live Audio-Visual',
          venue: 'Bank of Singapore Co-lab, Areté, Ateneo de Manila University'
        },
        {
          date: 'OCT 22-24',
          time: 'Panel 1: 13:30-15:00  Panel 2: 15:30-17:00',
          title: 'Symposium: FEEDBACK FORUM 2019',
          venue: 'Benchan Art Suite, Areté, Ateneo de Manila University'
        },
        {
          date: 'OCT 24',
          time: '18:00-20:00',
          title: 'Special Program: PIDGIN CARTOGRAPHY: Experiments on Graphic Notation',
          venue: 'Areté Lobby, Areté, Ateneo de Manila University'
        },
        {
          date: 'OCT 24',
          time: '20:00-22:00',
          title: 'Special Program: END OF FRAME (Opening Concert)',
          venue: 'Hyundai Hall, Areté, Ateneo de Manila University'
        },
        {
          date: 'OCT 24',
          time: '22:00-03:00',
          title: 'Club Night: SWARM',
          venue: 'XX XX'
        },
        {
          date: 'OCT 25',
          time: '20:30-22:00',
          title: 'Special Program: SHAPESHIFTERS: MUSICMAKERS HACKLAB 2019',
          venue: 'Dulo (2nd floor)'
        },
        {
          date: 'OCT 25',
          time: '22:00-00:00',
          title: 'Concurrent Show: POLTERGEIST',
          venue: 'The Ruins, Poblacion'
        },
        {
          date: 'OCT 25',
          time: '22:00-04:00',
          title: 'Club night: WSK x Elephant',
          venue: 'XX XX'
        },
        {
          date: 'OCT 25',
          time: '22:30-02:00',
          title: 'Concurrent Show: TORTURE GARDEN',
          venue: 'Limbo'
        },
        {
          date: 'OCT 26',
          time: '18:00-00:00',
          title: 'Market: Indie Label Meet-Up and Vistrax Album Launch',
          venue: 'Dulo (1st floor)'
        },
        {
          date: 'OCT 26',
          time: '16:00-18:00',
          title: 'Special Program: Floaters Stage',
          venue: 'Streets of Poblacion'
        },
        {
          date: 'OCT 26',
          time: '21:00-01:00',
          title: 'Concurrent Show: BABEL',
          venue: 'Dulo (2nd floor)'
        },
        {
          date: 'OCT 26',
          time: '21:00-03:00',
          title: 'Club night: VISTRAX: Noise and Beats from the Visayas',
          venue: 'Futur:st'
        },
        {
          date: 'OCT 27',
          time: '14:00-15:00',
          title: 'Special Program: Audio Tour',
          venue: 'Streets of Escolta'
        },
        {
          date: 'OCT 27',
          time: '15:30-16:25',
          title: 'Special Program: PARADE',
          venue: 'Arroceros Forest Park'
        },
        {
          date: 'OCT 27',
          time: '11:00-21:00',
          title: 'Market: AFK: Print and Zine Fair',
          venue: 'TBA'
        },
        {
          date: 'OCT 27',
          time: '16:25-17:10',
          title: 'Special Program: RAMBULAN SA LAWTON UNDERPASS (TROUBLE AT LAWTON UNDERPASS)',
          venue: 'Lawton Underpass, Manila'
        },
        {
          date: 'OCT 27',
          time: '18:00-22:30',
          title: 'Festival Closing Concert: SPECTRES',
          venue: 'Rajah Sulayman Theater, Intramuros'
        },
        {
          date: 'OCT 27',
          time: '22:30-01:30',
          title: 'Festival Closing Party: 10 TAONG WALANG DIYOS! THE WSK AFTER-PARTY (10 GODLESS YEARS! THE WSK AFTER-PARTY)',
          venue: 'Casa Manila, Intramuros'
        }
      ]
    }
  }
}
</script>
