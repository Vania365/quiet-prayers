/* Quiet Prayers: 42 more original prayers (total 100). Appended at the end so saved ids stay stable. */
(function () {
  "use strict";
  const ALL_LOST = ["lost_spouse", "lost_child", "lost_parent", "lost_friend"];
  const MORE = [
    // morning
    {c:"morning",ti:"A morning with open hands",x:"Lord, I open my hands this morning. I do not know what the day will place in them: a task, a burden, a surprise. Whatever it is, let me receive it with thanks and hold it loosely.",v:"day",th:[]},
    {c:"morning",ti:"For a gentle start",x:"Father, some mornings the world is already too loud. Let me begin with a few quiet breaths and Your name. Soften my tone, slow my steps, and make me kind before I am clever.",v:"still",th:[]},
    {c:"morning",ti:"Before the messages",x:"God, before I look at any screen, I look up at You. Order my thoughts. Show me the one thing today that matters most, and give me the courage to do it first.",v:"trust",th:["anxiety"]},
    {c:"morning",ti:"For those I will meet today",x:"Lord, today I will meet people I do not know and people I know too well. Let me notice them. Make me patient with the slow, gentle with the tired, and honest with those who need the truth.",v:"careful",th:[]},
    {c:"morning",ti:"Thanks for small things",x:"Lord, thank You for the light in the window, the first sip of something warm, and the birds that start before I do. Let me begin this day already grateful.",v:"mercies",th:["gratitude"]},
    // noon
    {c:"noon",ti:"A prayer over my work",x:"Father, thank You for work to do. Bless my hands and my attention. Let me do what I do today as if it were for You: without hurry, without complaint, and with some joy.",v:"trust",th:[]},
    {c:"noon",ti:"In the middle of the noise",x:"Lord, I have been so busy I forgot to breathe. I stop. I breathe. I remember that You are in this room. Quiet whatever is loud inside me and send me back to my day lighter.",v:"still",th:["anxiety"]},
    {c:"noon",ti:"A meal alone",x:"God, thank You for this food and for this quiet table. Even when I eat alone, I am not alone. Be my company, and remind me of the people who think of me today.",v:"bread",th:["lonely"]},
    // evening
    {c:"evening",ti:"Gathering the day",x:"Lord, I gather the whole day and place it in front of You: the good, the unfinished, the regrets. I do not need to sort it tonight. Take it, and let me rest.",v:"burden",th:["sleep"]},
    {c:"evening",ti:"Forgiveness before sleep",x:"Father, I forgive those who hurt me today, as I want to be forgiven. If there is someone I owe an apology, show me who, and give me the courage to say it tomorrow. Let me sleep without a grudge.",v:"peace",th:["family","sleep"]},
    {c:"evening",ti:"For the people I love tonight",x:"God, I name the people I love, one by one, in the quiet. Wherever they are tonight, be with them. Keep them safe, calm their fears, and let them know they are loved.",v:"bless",th:["family"]},
    {c:"evening",ti:"A thankful pillow",x:"Lord, I think of three good things from today, and I thank You for each. They were small, and they were gifts. Let me fall asleep counting blessings and not worries.",v:"thanks",th:["gratitude","sleep"]},
    // family
    {c:"family",ti:"For a teenager",x:"Father, my teenager is hard to reach, and harder to understand. Give me patience that outlasts the slammed doors. Keep them safe in places I cannot see. Let them know, even when they roll their eyes, that I am here.",v:"train",th:["family"]},
    {c:"family",ti:"For a new baby",x:"Lord, thank You for this new life. I am tired, and afraid I will get it wrong. Give me patience in the night hours, wisdom I do not have yet, and a heart that melts every time.",v:"heritage",th:["family"]},
    {c:"family",ti:"For a marriage that is tired",x:"God, our marriage is tired. Soften both of us. Help us listen to understand and not to win. Remind us why we began, and give us one small kindness to do for each other today.",v:"peace",th:["family"]},
    {c:"family",ti:"For my brother or sister",x:"Lord, thank You for the sibling who shares my story. We have not always been close. Heal the old arguments, and give us a chance to laugh together again about the things only we remember.",v:"bless",th:["family"]},
    {c:"family",ti:"For caring for a parent",x:"Father, the roles are turned upside down, and I am caring for the one who cared for me. Give me patience when they repeat themselves, dignity for them when they cannot do what they once did, and strength for me.",v:"rest",th:["caregiver","family"]},
    {c:"family",ti:"For the family table",x:"Lord, bless this table, and everyone who sits at it or wishes they could. Make it a place of welcome. Where there are empty chairs, fill the room with gentleness.",v:"good",th:["family","gratitude"]},
    // grief
    {c:"grief",ti:"The phone that will not ring",x:"Lord, I looked at my phone again, hoping for a message from {lost}. I know it will not come. Hold what I cannot say, and let love find its way across the distance.",v:"tears",th:ALL_LOST},
    {c:"grief",ti:"A good memory",x:"God, a memory of {lost} came to me today, and I smiled before I cried. Thank You for that smile. Let me keep these moments close, and let them warm me more than they hurt.",v:"joy",th:ALL_LOST},
    {c:"grief",ti:"When people say time heals",x:"Father, people mean well when they tell me it will get easier. Some days it does not feel that way. I ask for patience with myself and with them. Teach me to carry this loss at the speed I can bear.",v:"broken",th:ALL_LOST.concat(["lost_pet"])},
    {c:"grief",ti:"A birthday I cannot celebrate",x:"Lord, today would have been a birthday I remember. I will not pretend it is an ordinary day. I entrust {lost} to Your light, and let me honour the day with a candle, a song, or a quiet thank You.",v:"joy",th:ALL_LOST},
    {c:"grief",ti:"The empty bowl",x:"God, I picked up the bowl again, and the house felt too quiet. I miss {lost}. Thank You for the joy, the muddy paws and the warm weight at my feet. Teach me to carry this love gently.",v:"preserve",th:["lost_pet"]},
    {c:"grief",ti:"When I am angry",x:"Lord, I am angry. At the loss, at the unfairness, perhaps even at You. I will not hide it. You can handle it. Stay with me in the storm, and let honesty be my prayer tonight.",v:"broken",th:ALL_LOST.concat(["lost_pet"])},
    // anxiety
    {c:"peace",ti:"When I cannot decide",x:"Father, I am torn between choices and afraid of choosing wrongly. Quiet the voices. Show me the next faithful step, not the whole map. I trust that You can guide a decision made in good faith.",v:"trust",th:["anxiety"]},
    {c:"peace",ti:"A night of worry",x:"God, it is the hour when every fear grows larger. I set them out one by one in front of You: the money, the health, the family. You are bigger than all of them. Let me rest.",v:"burden",th:["anxiety","sleep"]},
    {c:"peace",ti:"Slowing my breath",x:"Lord, I breathe in Your peace and breathe out my fear. Again. And again. I do not need a perfect prayer. Only this breath, and You.",v:"still",th:["anxiety"]},
    {c:"peace",ti:"When the news is heavy",x:"Father, I have taken in too much bad news. Remind me that I am small and You are not. Let me do the good I can near me, and leave the rest in Your hands.",v:"strong",th:["anxiety"]},
    // health
    {c:"peace",ti:"Before a doctor's visit",x:"Lord, tomorrow I will sit in a waiting room. Calm my heart. Give the doctors clear eyes and a gentle voice. Whatever they say, I will not face it alone.",v:"fear",th:["health","anxiety"]},
    {c:"peace",ti:"On a day of pain",x:"God, my body hurts today. Give me relief, or give me patience. Let me not become small and bitter in the pain. Use even this day to teach me tenderness.",v:"heal",th:["health"]},
    {c:"peace",ti:"Getting better",x:"Father, thank You for each small step toward getting better. Give me patience when it is slow, and gratitude for each improvement. Help me rest without guilt.",v:"wait",th:["health"]},
    // lonely
    {c:"peace",ti:"A letter I could write",x:"Lord, there is someone I have not spoken to in a long time. Put their name in front of me today, and give me the courage to write a short note. A little kindness sent out can find its way back.",v:"hills",th:["lonely"]},
    {c:"peace",ti:"Not invisible",x:"God, some days I feel like no one sees me. You see me. Let me be seen by one person today, and let me see someone who needs it more than I do.",v:"shepherd",th:["lonely"]},
    // money
    {c:"peace",ti:"When work is uncertain",x:"Father, my work feels uncertain, and so does my future. Open a door, even a small one. Keep me from panic. Remind me that my worth is not my paycheck.",v:"trust",th:["money","anxiety"]},
    {c:"peace",ti:"A generous heart",x:"Lord, when I have little, make me generous with what I have. A kind word costs nothing, and a meal shared is never wasted. Let me give without keeping count.",v:"good",th:["money","gratitude"]},
    // caregiver
    {c:"peace",ti:"The long night shift",x:"God, I am awake again with the one I care for. The hours are long and I am worn thin. Be my strength. Let this tired love count for something that lasts.",v:"wait",th:["caregiver"]},
    {c:"peace",ti:"Asking for help",x:"Lord, I have been carrying this alone. Teach me to say, “I need help,” and to accept it when it comes. Send people who ease the load, and keep me from being too proud to receive.",v:"rest",th:["caregiver"]},
    // faith
    {c:"peace",ti:"When I have questions",x:"Father, I do not have all the answers, and some questions hurt. I bring them to You instead of burying them. Be patient with me, and teach me to trust You in the not-knowing.",v:"trust",th:["faith"]},
    {c:"peace",ti:"Coming back",x:"God, I have been away from You for a while, and I am not sure how to begin again. I will begin here, with this plain prayer. Receive me, and walk with me one small step at a time.",v:"mercies",th:["faith"]},
    {c:"peace",ti:"Just Your presence",x:"Lord, I have nothing impressive to say today. I only want to sit in Your company. Be near, and let that be enough.",v:"shepherd",th:["faith"]},
    // gratitude
    {c:"peace",ti:"The ordinary miracles",x:"Thank You, God, for the ordinary miracles: a working body, a warm bed, someone who knows my name. Let me not wait for something big to be thankful.",v:"good",th:["gratitude"]},
    {c:"peace",ti:"For a long life",x:"Lord, I have lived many years. I thank You for what I have learned, even the hard lessons. Use my experience to help someone younger, and give me a few more good days to love.",v:"days",th:["gratitude","faith"]}
  ];
  MORE.forEach(function (p) { P.push(p); });
  if (typeof render === "function") render();
})();
