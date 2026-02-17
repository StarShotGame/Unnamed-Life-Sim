const firstNames = {
  female: ["Emma", "Ava", "Mia", "Sophia", "Zoe", "Luna", "Nora", "Isla", "Layla", "Maya"],
  male: ["Liam", "Noah", "Ethan", "Mason", "Leo", "Lucas", "Kai", "Ezra", "Arlo", "Owen"],
  nonbinary: ["Alex", "Rowan", "Sage", "Quinn", "Avery", "River", "Sky", "Phoenix", "Harper", "Micah"],
};

const lastNames = [
  "Johnson", "Lopez", "Patel", "Carter", "Kim", "Nguyen", "Brooks", "Miller", "Garcia", "Turner",
  "Clark", "Sanchez", "Reed", "Bennett", "Price", "Collins", "Hayes", "Rivera", "Cooper", "Ward",
];

const EDUCATION_ORDER = {
  none: 0,
  high_school: 1,
  associate: 2,
  postsecondary_award: 2,
  bachelors: 3,
  masters: 4,
  doctoral_professional: 5,
};

const SCHOOLS = [
  { name: "Elementary School", startAge: 5, endAge: 10, grades: "K-5" },
  { name: "Middle School", startAge: 11, endAge: 13, grades: "6-8" },
  { name: "High School", startAge: 14, endAge: 17, grades: "9-12" },
];

const jobsCatalog = [
  { title: "Anesthesiologists", salary: 239200, requirement: "doctoral_professional" },
  { title: "Cardiologists", salary: 239200, requirement: "doctoral_professional" },
  { title: "Dermatologists", salary: 239200, requirement: "doctoral_professional" },
  { title: "Emergency Medicine Physicians", salary: 239200, requirement: "doctoral_professional" },
  { title: "Neurologists", salary: 239200, requirement: "doctoral_professional" },
  { title: "Obstetricians and Gynecologists", salary: 239200, requirement: "doctoral_professional" },
  { title: "Orthopedic Surgeons, Except Pediatric", salary: 239200, requirement: "doctoral_professional" },
  { title: "Pediatric Surgeons", salary: 239200, requirement: "doctoral_professional" },
  { title: "Psychiatrists", salary: 239200, requirement: "doctoral_professional" },
  { title: "Radiologists", salary: 239200, requirement: "doctoral_professional" },
  { title: "Family Medicine Physicians", salary: 238400, requirement: "doctoral_professional" },
  { title: "General Internal Medicine Physicians", salary: 236400, requirement: "doctoral_professional" },
  { title: "Dentists, General", salary: 172800, requirement: "doctoral_professional" },
  { title: "Dentists, All Other Specialists", salary: 225800, requirement: "doctoral_professional" },
  { title: "Pharmacists", salary: 137500, requirement: "doctoral_professional" },
  { title: "Physicists", salary: 166300, requirement: "doctoral_professional" },
  { title: "Podiatrists", salary: 152800, requirement: "doctoral_professional" },
  { title: "Lawyers", salary: 151200, requirement: "doctoral_professional" },
  { title: "Judges, Magistrate Judges, and Magistrates", salary: 156200, requirement: "doctoral_professional" },
  { title: "Law Teachers, Postsecondary", salary: 126700, requirement: "doctoral_professional" },
  { title: "Veterinarians", salary: 125500, requirement: "doctoral_professional" },
  { title: "Clinical and Counseling Psychologists", salary: 95800, requirement: "doctoral_professional" },
  { title: "Elementary School Teachers, Except Special Education", salary: 62300, requirement: "bachelors" },
  { title: "Middle School Teachers, Except Special and Career/Technical Education", salary: 63000, requirement: "bachelors" },
  { title: "Secondary School Teachers, Except Special and Career/Technical Education", salary: 64600, requirement: "bachelors" },
  { title: "Special Education Teachers, Secondary School", salary: 69600, requirement: "bachelors" },
  { title: "Education Administrators, Kindergarten through Secondary", salary: 104100, requirement: "masters" },
  { title: "Education Administrators, Postsecondary", salary: 104000, requirement: "masters" },
  { title: "Nurse Anesthetists", salary: 223200, requirement: "masters" },
  { title: "Nurse Practitioners", salary: 129200, requirement: "masters" },
  { title: "Nurse Midwives", salary: 128800, requirement: "masters" },
  { title: "Physician Assistants", salary: 133300, requirement: "masters" },
  { title: "Genetic Counselors", salary: 98900, requirement: "masters" },
  { title: "Speech-Language Pathologists", salary: 95400, requirement: "masters" },
  { title: "School Psychologists", salary: 86900, requirement: "masters" },
  { title: "Chief Executives", salary: 206400, requirement: "bachelors" },
  { title: "Computer and Information Systems Managers", salary: 171200, requirement: "bachelors" },
  { title: "Architectural and Engineering Managers", salary: 167700, requirement: "bachelors" },
  { title: "Financial Managers", salary: 161700, requirement: "bachelors" },
  { title: "Marketing Managers", salary: 161000, requirement: "bachelors" },
  { title: "Software Developers", salary: 133100, requirement: "bachelors" },
  { title: "Data Scientists", salary: 112600, requirement: "bachelors" },
  { title: "Database Architects", salary: 136000, requirement: "bachelors" },
  { title: "Computer Network Architects", salary: 130400, requirement: "bachelors" },
  { title: "Information Security Analysts", salary: 124900, requirement: "bachelors" },
  { title: "Computer Systems Analysts", salary: 103800, requirement: "bachelors" },
  { title: "Web Developers", salary: 90900, requirement: "bachelors" },
  { title: "Commercial Pilots", salary: 122700, requirement: "postsecondary_award" },
  { title: "Airline Pilots, Copilots, and Flight Engineers", salary: 226600, requirement: "bachelors" },
  { title: "Air Traffic Controllers", salary: 144600, requirement: "associate" },
  { title: "Nuclear Technicians", salary: 104200, requirement: "associate" },
  { title: "Radiation Therapists", salary: 102000, requirement: "associate" },
  { title: "Dental Hygienists", salary: 94300, requirement: "associate" },
  { title: "Registered Nurses", salary: 93600, requirement: "bachelors" },
  { title: "Paralegals and Legal Assistants", salary: 61000, requirement: "associate" },
  { title: "Electricians", salary: 62400, requirement: "high_school" },
  { title: "Detectives and Criminal Investigators", salary: 93600, requirement: "high_school" },
  { title: "Police and Sheriff's Patrol Officers", salary: 76300, requirement: "high_school" },
  { title: "Flight Attendants", salary: 67100, requirement: "high_school" },
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

function educationLabel(level) {
  return {
    none: "No diploma yet",
    high_school: "High school diploma",
    associate: "Associate's degree",
    postsecondary_award: "Postsecondary non-degree award",
    bachelors: "Bachelor's degree",
    masters: "Master's degree",
    doctoral_professional: "Doctoral or professional degree",
  }[level];
}

function getEducationLevel(age) {
  if (age >= 26) return "doctoral_professional";
  if (age >= 24) return "masters";
  if (age >= 22) return "bachelors";
  if (age >= 20) return chance(0.5) ? "associate" : "postsecondary_award";
  if (age >= 18) return "high_school";
  return "none";
}

function getSchoolStage(age) {
  return SCHOOLS.find((school) => age >= school.startAge && age <= school.endAge) || null;
}

function jobsUnlockedByEducation(level) {
  return jobsCatalog
    .filter((job) => EDUCATION_ORDER[level] >= EDUCATION_ORDER[job.requirement])
    .sort((a, b) => b.salary - a.salary)
    .slice(0, 12);
}

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

  const currentEducation = getEducationLevel(player.age);
  const schoolStage = getSchoolStage(player.age);
  const unlockedJobs = jobsUnlockedByEducation(currentEducation);

  profileSection.innerHTML = `
    <h2>${player.firstName} ${player.lastName}</h2>
    <p><strong>Age:</strong> ${player.age}</p>
    <p><strong>School Track (Marion County, FL):</strong> Elementary (5-10), Middle (11-13), High (14-17).</p>
    <p><strong>Current School Stage:</strong> ${schoolStage ? `${schoolStage.name} (Grades ${schoolStage.grades})` : "Not school age / graduated"}</p>
    <p><strong>Education Level:</strong> ${educationLabel(currentEducation)}</p>
    <p><strong>Start dynamic:</strong> ${familyData.dynamicSummary}</p>
    <p><strong>Family Tree:</strong> Family members are generated and stored for the in-game Family Tree menu.</p>
    <button id="age-up-btn" type="button">Age Up +1 Year</button>
    <h3>Career Paths Currently Unlocked</h3>
    <ul class="career-list">
      ${unlockedJobs.map((job) => `<li><strong>${job.title}</strong> — $${job.salary.toLocaleString()} / yr (${educationLabel(job.requirement)})</li>`).join("")}
    </ul>
    <p class="hint">Examples: Teachers require a bachelor's degree, lawyers require law school/professional degree, and physician specialties require medical school/professional doctorate.</p>
  `;

  document.getElementById("age-up-btn").addEventListener("click", () => {
    gameState.player.age += 1;
    renderGame(gameState.player, familyData);
  });
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

  const relatives = [father, mother, ...siblings, paternalGrandpa, paternalGrandma, maternalGrandpa, maternalGrandma];

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
