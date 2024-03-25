import { AllHeartBeatData, IHeartBeatData } from "@/types/wakatimeTypes";

// Função para formatar a data no formato 'YYYY-MM-DD'
const formatDate = (date:Date) => {
  let day = date.getDate().toString().padStart(2, '0');
  let month = (date.getMonth() + 1).toString().padStart(2, '0');
  let year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

// Função para buscar os heartbeats de um dia específico usando Fetch API
const fetchHeartbeatForDate = async (access_token:string, date:Date) => {
  const formattedDate = formatDate(date);
  const url = `https://wakatime.com/api/v1/users/current/heartbeats?date=${formattedDate}`;
  const headers = {
    'Authorization': `Bearer ${access_token}`
  };

  return fetch(url, { headers })
    .then(response => response.json());
};

// Função para buscar os heartbeats dos últimos 7 dias
export const fetchHeartbeatsForNumberOfDays = async (access_token:string, days=7):Promise<IHeartBeatData[]> => {
  const promises = [];
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    promises.push(fetchHeartbeatForDate(access_token, date));
  }
  return Promise.all<AllHeartBeatData>(promises)
    .then(responses => {
      return responses.flatMap(heartbeats => {
        return heartbeats.data.map(item=>{
          const dataObj = new Date(item.created_at);
          const timezone = 'America/Sao_Paulo';
          return {...item, created_at:  dataObj.toLocaleString('pt-BR', { timeZone: timezone }), serverDate:dataObj}
        })
      });
    })
    .catch(error => {
      console.error('Erro ao buscar dados:', error);
      return []
    });
};
