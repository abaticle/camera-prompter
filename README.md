# 🎬 Guide d'Installation de CinePrompter (Spécial Débutants)

Bienvenue dans **CinePrompter** ! Ce guide a été conçu spécialement pour vous si vous n'avez **jamais écrit une seule ligne de code** et que vous n'avez jamais utilisé d'outils de programmation. 

Suivez simplement ces étapes simples, une par une, et vous ferez tourner l'application sur votre ordinateur en moins de 5 minutes ! 🚀

---

## 📋 Prérequis : De quoi a-t-on besoin ?
Pour faire fonctionner l'application, nous avons besoin de deux choses :
1. **Node.js** : C'est le moteur qui permet de faire tourner le serveur de l'application sur votre ordinateur.
2. **Une clé d'API Gemini** : C'est le code secret (fourni gratuitement ou via Google) qui permet à l'intelligence artificielle de générer vos magnifiques prompts de cinéma.

---

## 🛠️ Étape 1 : Installer Node.js (Le moteur de l'application)

1. Cliquez sur ce lien pour aller sur le site officiel : **[Télécharger Node.js](https://nodejs.org/)**.
2. Sur la page d'accueil, cliquez sur le gros bouton vert marqué **LTS** (c'est la version la plus stable et recommandée).
3. Une fois le fichier téléchargé, double-cliquez dessus pour lancer l'installation.
4. Suivez l'assistant d'installation :
   - Cliquez sur **Next** (Suivant).
   - Cochez la case pour accepter la licence de droits d'utilisation, puis cliquez sur **Next**.
   - Laissez tous les dossiers et options par défaut (ne changez rien) et cliquez sur **Next** à chaque fois.
   - Cliquez enfin sur **Install** (Installer).
   - Si Windows vous demande l'autorisation, cliquez sur **Oui**.
   - Cliquez sur **Finish** (Terminer) une fois que c'est fini.

*Félicitations, le moteur de l'application est installé ! 🎉*

---

## 📂 Étape 2 : Ouvrir le dossier de l'application

Le dossier contenant l'application se trouve actuellement sur votre ordinateur à l'adresse suivante :
`C:\Dev\JS\test-prompter-cine`

---

## 💻 Étape 3 : Ouvrir la Console Windows (L'invite de commandes)

Ne paniquez pas, la console est juste un outil très simple pour lancer l'application avec du texte.

1. Appuyez sur la touche **Windows** de votre clavier (ou cliquez sur le menu Démarrer en bas à gauche).
2. Tapez les trois lettres **cmd** (ou écrivez "Invite de commandes").
3. Cliquez sur l'application **Invite de commandes** qui apparaît.
4. Une fenêtre noire s'ouvre. C'est votre console !

---

## 🗺️ Étape 4 : Se placer dans le dossier du projet

Actuellement, votre console noire est placée dans votre dossier utilisateur personnel. Nous devons lui dire d'aller dans le dossier où se trouve l'application.

1. Copiez la ligne suivante :
   ```cmd
   cd C:\Dev\JS\test-prompter-cine
   ```
   *(Note : `cd` signifie "Change Directory", ou "Changer de dossier" en français).*
2. Faites un **clic droit** dans la fenêtre noire de la console pour coller la commande (ou appuyez sur `Ctrl + V`).
3. Appuyez sur la touche **Entrée** de votre clavier.
4. Vous devriez voir que la ligne de texte de la console commence maintenant par `C:\Dev\JS\test-prompter-cine>`. C'est parfait !

---

## 📦 Étape 5 : Installer l'application

Maintenant que nous sommes dans le bon dossier, nous allons demander à Node.js de télécharger automatiquement tous les composants nécessaires à l'application.

1. Tapez la commande suivante dans la console :
   ```cmd
   npm install
   ```
2. Appuyez sur **Entrée**.
3. Vous allez voir du texte défiler pendant 10 à 30 secondes. C'est tout à fait normal ! Node.js installe les modules Express et Google AI.
4. Attendez que le défilement s'arrête et que la ligne `C:\Dev\JS\test-prompter-cine>` réapparaisse.

---

## 🚀 Étape 6 : Lancer l'application !

Tout est prêt ! Il ne reste plus qu'à démarrer le serveur.

1. Tapez la commande suivante dans la console :
   ```cmd
   node server.js
   ```
2. Appuyez sur **Entrée**.
3. Vous devriez voir s'afficher ce magnifique message dans la console :
   ```text
   ===================================================
   🎬 Cinema Prompt Generator Backend is running!
   👉 http://localhost:3000
   ===================================================
   ```

---

## 🎈 Étape 7 : Utiliser l'application !

1. Ouvrez votre navigateur internet préféré (Chrome, Edge, Firefox, etc.).
2. Dans la barre d'adresse tout en haut, tapez : **[http://localhost:3000](http://localhost:3000)** et appuyez sur **Entrée**.
3. **Le tableau de bord de CinePrompter apparaît sous vos yeux ! 😍**

---

## 🔑 Étape 8 : Configurer votre clé d'API Google Gemini

Pour que l'intelligence artificielle fonctionne, vous devez lui donner votre clé d'API. C'est ultra simple et se fait directement dans l'interface, sans toucher au code !

1. En haut à droite du site, cliquez sur le bouton rouge clignotant **`🔑 API Key Required`**.
2. Une fenêtre s'ouvre au milieu de l'écran.
3. Collez votre clé secrète Google Gemini (elle commence généralement par `AIzaSy...`) dans le premier champ de texte.
4. Laissez la version du modèle par défaut (`gemini-3-flash-preview` ou `gemini-1.5-flash`).
5. Cliquez sur le bouton jaune **Save Changes** (Sauvegarder).
6. Une petite alerte vous confirme que les paramètres sont sauvegardés dans votre fichier local !

---

## 🎬 Comment générer votre premier prompt ?

1. Cliquez sur l'un des boutons de presets sous "Presets:" (par exemple : **`⚡ Neon Cyberpunk`**).
2. Vous verrez que tout le formulaire se remplit automatiquement avec des paramètres de caméras, de lentilles et d'éclairages professionnels.
3. Cliquez sur le gros bouton jaune en bas : **`🎬 Generate Cinematic Scene Prompt`**.
4. Le retour moniteur à droite va s'activer avec un clap de cinéma clignotant et simuler le traitement en direct !
5. En quelques secondes, le prompt parfait pour Midjourney ou Nano Banana apparaît, accompagné des notes du réalisateur et de la palette de couleurs d'étalonnage.
6. Cliquez sur le petit bouton de copie pour récupérer le prompt et l'utiliser où vous le souhaitez.

---

## 🛑 Comment éteindre l'application ?

Lorsque vous avez fini d'utiliser l'application, retournez sur la fenêtre noire de la console et appuyez simultanément sur les touches **`Ctrl + C`** de votre clavier. Cela arrêtera proprement le serveur. Vous pouvez ensuite fermer la fenêtre noire.
