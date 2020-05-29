const Mission = require('../model/Mission')


exports.addMission = (type,datefin,date,lieu, nom_res,nombre_preson,imageUrl, besoin,sujet,description) => {

  const mission = new mission()

  mission.imageUrl = imageUrl
  
  mission.description=description,
  mission.sujet=sujet,
  mission.besoin=besoin,
  mission.nombre_preson=nombre_preson,
  mission.nom_res=nom_res,
  mission.lieu=lieu,
  mission.date=date,
  mission.datefin=datefin,
  mission.type=type
  return post.save()
}



