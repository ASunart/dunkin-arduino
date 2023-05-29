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