import React, { useState } from "react";
import Head from "next/head";

import styles from "../styles/Home.module.css";

import members from "../data/members.json";
import teams from "../data/teams.json";

const Home = () => {
  const [reviewers, setReviewers] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("front");
  const [selectedQnt, setSelectedQnt] = useState(2);

  const handleSelectTeam = (event) => {
    setSelectedTeam(event.target.value);
  };

  const handleSelectQnt = (event) => {
    setSelectedQnt(event.target.value);
  };

  const handleReset = (event) => {
    setReviewers([]);
  };

  const handleSubmit = (event) => {
    const membersFilter = members.filter(
      (member) => member.type == selectedTeam
    );

    const membersSort = membersFilter.sort(() => Math.random() * 2 - 1);
    const result = membersSort.splice(0, selectedQnt);
    
    setReviewers(result);

    event.preventDefault();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>pr reviewers generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>pr reviewers generator 👾</h1>

        <div className={styles.grid}>
          {reviewers.length == 0 ? (
            <div className={styles.card}>
              <form className={styles.form} onSubmit={handleSubmit}>
                <h3>Selecione um time</h3>
                <select
                  name="team"
                  id="team"
                  className={styles.select}
                  value={selectedTeam}
                  onChange={handleSelectTeam}
                >
                  {teams.map((team, i) => (
                    <option key={i} value={team.value}>
                      {team.name}
                    </option>
                  ))}
                </select>

                <h3>Quantidade de revisores</h3>
                <select
                  name="team"
                  id="team"
                  className={styles.select}
                  value={selectedQnt}
                  onChange={handleSelectQnt}
                >
                  <option value="1">Um</option>
                  <option value="2">Dois</option>
                  <option value="3">Três</option>
                  <option value="4">Quatro</option>
                </select>

                <button className={styles.button} type="submit">
                  Sortear
                </button>
              </form>
            </div>
          ) : (
            <div className={styles.card}>
              <h3>Revisores selecionados</h3>
              <ul className={styles.list}>
                {reviewers.map((user) => (
                  <li key={user?.id}>
                    <p>{user?.name}</p>
                  </li>
                ))}
              </ul>

              <button
                onClick={handleReset}
                className={styles.button}
              >
                Reset
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Home
