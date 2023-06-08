import { parse } from "dotenv";

export function getPlacePopularity(interactions) {
  const jpInteractions = interactions.filter(interaction => {
      return interaction.location === "Jardín Plaza"
  });
  const uniInteractions = interactions.filter(interaction => {
      return interaction.location === "Unicentro"
  });

  return { "Jardín Plaza": jpInteractions.length, "Unicentro": uniInteractions.length}
}

export function getPlacePopularityByDay(interactions) {
  const weekdays = {
    'Do': 0,
    'Lu': 1,
    'Ma': 2,
    'Mi': 3,
    'Ju': 4,
    'Vi': 5,
    'Sa': 6
  };
  const visitsByDay = Array.from({ length: 7 }, () => ({
    'Jardín Plaza': 0,
    'Unicentro': 0
  }));

  interactions.forEach(visit => {
    const day = visit.day.split(' ')[0];
    const location = visit.location;
    if (weekdays[day] !== undefined && visitsByDay[weekdays[day]][location] !== undefined) {
      visitsByDay[weekdays[day]][location]++;
    }
  });

  return visitsByDay;
}

export function getPlacePopularityByInterval(interactions) {
  const intervals = {
    '7am-9am': {
      'Jardín Plaza': 0,
      'Unicentro': 0
    },
    '9am-11am': {
      'Jardín Plaza': 0,
      'Unicentro': 0
    },
    '11am-1pm': {
      'Jardín Plaza': 0,
      'Unicentro': 0
    },
    '1pm-3pm': {
      'Jardín Plaza': 0,
      'Unicentro': 0
    },
    '3pm-5pm': {
      'Jardín Plaza': 0,
      'Unicentro': 0
    },
    '5pm-7pm': {
      'Jardín Plaza': 0,
      'Unicentro': 0
    },
    '7pm-9pm': {
      'Jardín Plaza': 0,
      'Unicentro': 0
    },
    '9pm-11pm': {
      'Jardín Plaza': 0,
      'Unicentro': 0
    }
  };
  
  interactions.forEach(visit => {
    const timeString = visit.hour; // Supongamos que el tiempo está en formato 'HH:mm'
    const hour = parseInt(timeString.split(':')[0], 10);
    const location = visit.location;
    
    if (hour >= 7 && hour < 9) {
      intervals['7am-9am'][location]++;
    } else if (hour >= 9 && hour < 11) {
      intervals['9am-11am'][location]++;
    } else if (hour >= 11 && hour < 13) {
      intervals['11am-1pm'][location]++;
    } else if (hour >= 13 && hour < 15) {
      intervals['1pm-3pm'][location]++;
    } else if (hour >= 15 && hour < 17) {
      intervals['3pm-5pm'][location]++;
    } else if (hour >= 17 && hour < 19) {
      intervals['5pm-7pm'][location]++;
    } else if (hour >= 19 && hour < 21) {
      intervals['7pm-9pm'][location]++;
    } else if (hour >= 21 && hour < 23) {
      intervals['9pm-11pm'][location]++;
    }
  });

  return intervals;
}