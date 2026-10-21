// Datos de la app — Rainer Cruz, ITLA 2025-0061
//
// FOTOS DE PERSONAJES: copia las imágenes en www/img/ con los nombres de "photo"
// (por ejemplo www/img/lelouch.jpg). Si el archivo no existe, la app muestra un emblema.
//
// VIDEOS DE MOMENTOS: pega el enlace de YouTube en "video" (cualquier formato: watch?v=, youtu.be/, embed/).
// El video se reproduce DENTRO de la app, sin abrir YouTube.
// "start" (opcional) = segundo en el que empieza el video, para saltar intros. Ej: start: 25

window.GEASS = {
  characters: [
    {
      id: "lelouch",
      name: "Lelouch vi Britannia",
      alias: "Zero",
      photo: "img/lelouch.jpg",
      color: "#7c3aed",
      glyph: "♚",
      voice: "Jun Fukuyama (japonés)",
      role: "Protagonista · Líder de la rebelión",
      bio: "Príncipe exiliado del Imperio de Britannia. Brillante estratega, trata la guerra como una partida de ajedrez. Obtiene el poder del Geass y lidera la rebelión bajo la identidad de Zero para vengar a su madre y construir un mundo mejor para su hermana Nunnally.",
      traits: ["Estratega", "Carismático", "Calculador"]
    },
    {
      id: "suzaku",
      name: "Suzaku Kururugi",
      alias: "El Caballero Blanco",
      photo: "img/suzaku.jpg",
      color: "#16a34a",
      glyph: "♞",
      voice: "Takahiro Sakurai (japonés)",
      role: "Amigo de la infancia · Rival",
      bio: "Joven japonés, amigo de Lelouch desde la niñez. Cree que el cambio debe lograrse desde dentro del sistema, por eso se une al ejército imperial. Sus ideales lo enfrentan directamente con su mejor amigo.",
      traits: ["Leal", "Idealista", "Piloto excepcional"]
    },
    {
      id: "cc",
      name: "C.C.",
      alias: "La bruja",
      photo: "img/cc.jpg",
      color: "#f59e0b",
      glyph: "♛",
      voice: "Yukana (japonés)",
      role: "Aliada misteriosa",
      bio: "Una chica enigmática que le ofrece a Lelouch el poder del Geass a cambio de un favor. Guarda en secreto su pasado, adora la pizza y acompaña a Lelouch durante toda la historia.",
      traits: ["Misteriosa", "Inmortal", "Fanática de la pizza"]
    },
    {
      id: "kallen",
      name: "Kallen Kōzuki",
      alias: "El As de los Caballeros Negros",
      photo: "img/kallen.jpg",
      color: "#dc2626",
      glyph: "♜",
      voice: "Ami Koshimizu (japonés)",
      role: "Piloto de la Orden de los Caballeros Negros",
      bio: "Estudiante en apariencia tranquila y piloto de élite en la resistencia. Lucha por la libertad de Japón y se convierte en una de las más fieles aliadas de Zero.",
      traits: ["Valiente", "Apasionada", "Piloto estrella"]
    }
  ],

  moments: [
    {
      id: "m1",
      title: "El contrato con C.C.",
      season: "Temporada 1 · Episodio 1",
      video: "https://youtu.be/XQuK9v42Pbc",
      start: 0,
      detail: "Todo empieza aquí. Lelouch, atrapado en medio de un conflicto, conoce a C.C. y acepta un trato que cambiará su destino: obtener el poder de dar órdenes absolutas. Es el momento en que el príncipe exiliado deja de ser un espectador.",
      color: "#7c3aed",
      glyph: "♚"
    },
    {
      id: "m2",
      title: "Lelouch vs. Suzaku",
      season: "Temporadas 1 y 2",
      video: "https://youtu.be/gJoJmJZPIAo",
      start: 0,
      detail: "El duelo de ideales entre dos amigos que quieren el mismo mundo por caminos opuestos. Lo que más me gusta de esta rivalidad es que ninguno de los dos es realmente “el malo”.",
      color: "#16a34a",
      glyph: "♞"
    },
    {
      id: "m3",
      title: "El Réquiem de Zero",
      season: "Temporada 2 (R2) · Episodio 25",
      video: "https://youtu.be/MuUba7wkp3s",
      start: 0,
      spoiler: true,
      detail: "El gran final. La culminación del plan de Lelouch, uno de los desenlaces más comentados del anime. ⚠ Contiene spoilers si aún no has terminado la serie.",
      color: "#dc2626",
      glyph: "♛"
    }
  ],

  about: [
    ["Título original", "Code Geass: Hangyaku no Lelouch"],
    ["Tipo", "Anime (serie de TV)"],
    ["Temporadas", "2 — Lelouch of the Rebellion (R1) y R2"],
    ["Episodios", "25 + 25 = 50"],
    ["Emisión", "R1: 2006–2007 · R2: 2008"],
    ["Creadores", "Gorō Taniguchi e Ichirō Ōkouchi"],
    ["Dirección", "Gorō Taniguchi"],
    ["Guion", "Ichirō Ōkouchi"],
    ["Estudio", "Sunrise"],
    ["Diseño original de personajes", "CLAMP"]
  ],
  premise: "En una historia alternativa, el Sacro Imperio de Britannia ha conquistado Japón. Lelouch, un príncipe exiliado, recibe de C.C. el poder del Geass y lo usa, bajo la máscara de Zero, para derribar al imperio que le arrebató todo."
};
