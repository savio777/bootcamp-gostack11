import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import api from './services/api';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function getRepositories() {
      const response = await api.get('/test');
      if (response.status == 200) {
        setProjects(response.data.projects);
      }
    }
    getRepositories();
  }, []);

  async function handleAddProject() {
    const body = {title: `Novo projeto: ${Date.now()}`, owner: 'savio'};

    const response = await api.post('test', body);

    if (response.status == 200) {
      setProjects([...projects, body]);
    }
  }

  return (
    <>
      {/*
      MANEIRA MAIS SIMPLES E PERFORMATICA PARA LISTA MUITO GRANDE
      <FlatList
        data={projects}
        keyExtractor={(project) => project.id}
        renderItem={({item: project}) => (
          <Text key={project.id}>{project.title}</Text>
          )}
        />*/}
      <View style={styles.container}>
        {/*
        NECESSARIO: contentContainerStyle={{flexGrow: 1}} 
        PARA A VIEW PEGAR O HEIGHT
        */}
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.containerProjects}>
            {projects.length > 0 &&
              projects.map((project) => (
                <Text key={project.id}>{project.title}</Text>
              ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159',
  },
  containerProjects: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingVertical: 5,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default App;
