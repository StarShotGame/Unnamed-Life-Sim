const firstNames = {
  female: ["Emma", "Ava", "Mia", "Sophia", "Zoe", "Luna", "Nora", "Isla", "Layla", "Maya"],
  male: ["Liam", "Noah", "Ethan", "Mason", "Leo", "Lucas", "Kai", "Ezra", "Arlo", "Owen"],
  nonbinary: ["Alex", "Rowan", "Sage", "Quinn", "Avery", "River", "Sky", "Phoenix", "Harper", "Micah"],
};

const lastNames = [
  "Johnson", "Lopez", "Patel", "Carter", "Kim", "Nguyen", "Brooks", "Miller", "Garcia", "Turner",
  "Clark", "Sanchez", "Reed", "Bennett", "Price", "Collins", "Hayes", "Rivera", "Cooper", "Ward",
];

const form = document.getElementById("character-form");
const avatar = document.getElementById("avatar");
const profileSection = document.getElementById("profile");

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const chance = (n) => Math.random() < n;
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const gameState = {
  player: null,
  family: [],
};

function randomFirstName(gender) {
  if (gender === "female" || gender === "male") return pick(firstNames[gender]);
  return pick(firstNames.nonbinary);
}

function randomLastName(exclude = []) {
  const options = lastNames.filter((name) => !exclude.includes(name));
  return pick(options.length ? options : lastNames);
}

function makePerson(role, gender, surname, ageRange, deathChance, extra = {}) {
  const age = randInt(ageRange[0], ageRange[1]);
  return {
    role,
    firstName: randomFirstName(gender),
    lastName: surname,
    gender,
    age,
    deceased: chance(deathChance),
    ...extra,
  };
}

function getInitials(person) {
  return `${person.firstName[0]}${person.lastName[0]}`.toUpperCase();
}

function renderGame(player, familyData) {
  avatar.textContent = getInitials(player);

  profileSection.classList.remove("hidden");

  profileSection.innerHTML = `
    <h2>${player.firstName} ${player.lastName}</h2>
    <p><strong>Age:</strong> ${player.age}</p>
    <p><strong>Start dynamic:</strong> ${familyData.dynamicSummary}</p>
    <p><strong>Family Tree:</strong> Family members are generated and stored for the in-game Family Tree menu.</p>
  `;

}

function generateFamily(player) {
  const fatherSurname = player.lastName;
  const motherBirthSurname = randomLastName([fatherSurname]);
  const parentsDivorced = chance(0.35);

  const father = makePerson("Father", "male", fatherSurname, [20, 55], 0.02);
  const motherCurrentSurname = parentsDivorced && chance(0.8) ? motherBirthSurname : fatherSurname;
  const mother = makePerson("Mother", "female", motherCurrentSurname, [20, 52], 0.02, {
    birthSurname: motherBirthSurname,
  });

  const siblings = Array.from({ length: randInt(0, 4) }, (_, i) => {
    const siblingSurname = chance(0.85) ? player.lastName : motherBirthSurname;
    return makePerson(`Sibling ${i + 1}`, pick(["female", "male", "nonbinary"]), siblingSurname, [0, 18], 0.01);
  });

  const paternalGrandpa = makePerson("Paternal Grandfather", "male", fatherSurname, [45, 85], 0.2);
  const paternalGrandma = makePerson("Paternal Grandmother", "female", fatherSurname, [43, 82], 0.18);

  const maternalGrandSurname = motherBirthSurname;
  const maternalGrandpa = makePerson("Maternal Grandfather", "male", maternalGrandSurname, [43, 85], 0.2);
  const maternalGrandma = makePerson("Maternal Grandmother", "female", maternalGrandSurname, [41, 82], 0.18);

  const auntsUncles = [];
  for (let i = 0; i < randInt(0, 3); i++) {
    const marriedAway = chance(0.4);
    const surname = marriedAway ? randomLastName([fatherSurname, maternalGrandSurname]) : fatherSurname;
    auntsUncles.push(makePerson(`Paternal ${chance(0.5) ? "Uncle" : "Aunt"} ${i + 1}`, pick(["female", "male"]), surname, [20, 60], 0.06));
  }

  for (let i = 0; i < randInt(0, 3); i++) {
    const marriedAway = chance(0.4);
    const surname = marriedAway ? randomLastName([fatherSurname, maternalGrandSurname]) : maternalGrandSurname;
    auntsUncles.push(makePerson(`Maternal ${chance(0.5) ? "Uncle" : "Aunt"} ${i + 1}`, pick(["female", "male"]), surname, [20, 60], 0.06));
  }

  const greatGrandparents = [];
  for (let i = 1; i <= 4; i++) {
    greatGrandparents.push(makePerson(`Paternal Great-Grandparent ${i}`, pick(["female", "male"]), fatherSurname, [65, 103], 0.52));
    greatGrandparents.push(makePerson(`Maternal Great-Grandparent ${i}`, pick(["female", "male"]), maternalGrandSurname, [65, 103], 0.52));
  }

  const greatAuntsUncles = [];
  for (let i = 0; i < randInt(1, 4); i++) {
    greatAuntsUncles.push(makePerson(`Paternal Great ${chance(0.5) ? "Uncle" : "Aunt"} ${i + 1}`, pick(["female", "male"]), fatherSurname, [50, 95], 0.35));
  }
  for (let i = 0; i < randInt(1, 4); i++) {
    greatAuntsUncles.push(makePerson(`Maternal Great ${chance(0.5) ? "Uncle" : "Aunt"} ${i + 1}`, pick(["female", "male"]), maternalGrandSurname, [50, 95], 0.35));
  }

  const relatives = [
    father,
    mother,
    ...siblings,
    paternalGrandpa,
    paternalGrandma,
    maternalGrandpa,
    maternalGrandma,
    ...auntsUncles,
    ...greatGrandparents,
    ...greatAuntsUncles,
  ];

  const dynamicSummary = parentsDivorced
    ? `Parents are divorced at game start. Father side follows ${fatherSurname}; mother side follows ${motherBirthSurname}.`
    : `Parents are together at game start. Most immediate family share the ${fatherSurname} surname.`;

  return { relatives, dynamicSummary };
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputFirst = document.getElementById("first-name").value.trim();
  const inputLast = document.getElementById("last-name").value.trim();
  const gender = document.getElementById("gender").value;

  const player = {
    firstName: inputFirst || randomFirstName(gender),
    lastName: inputLast || randomLastName(),
    gender,
    age: 0,
  };

  const family = generateFamily(player);
  gameState.player = player;
  gameState.family = family.relatives;
  renderGame(player, family);
});
