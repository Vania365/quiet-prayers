/* Pray with Me: 42 more prayers (total 142).
   Drafted by the Lovable assistant for the owner's own comparison project, then edited here:
   names turned into {lost}, living-person and pet names made generic, duplicate titles renamed,
   verses are King James Version (public domain). Appended at the end so saved ids stay stable. */
(function () {
  "use strict";
  Object.assign(V, {
    never:{ref:"Hebrews 13:5",t:"I will never leave thee, nor forsake thee."},
    sleepP:{ref:"Psalm 127:2",t:"It is vain for you to rise up early, to sit up late, to eat the bread of sorrows: for so he giveth his beloved sleep."},
    near:{ref:"James 4:8",t:"Draw nigh to God, and he will draw nigh to you."},
    keepgo:{ref:"Psalm 121:8",t:"The LORD shall preserve thy going out and thy coming in from this time forth, and even for evermore."},
    crown:{ref:"Proverbs 17:6",t:"Children's children are the crown of old men; and the glory of children are their fathers."},
    mercyAll:{ref:"Psalm 145:9",t:"The LORD is good to all: and his tender mercies are over all his works."},
    kind:{ref:"Ephesians 4:32",t:"And be ye kind one to another, tenderhearted, forgiving one another, even as God for Christ's sake hath forgiven you."},
    bed:{ref:"Psalm 41:3",t:"The LORD will strengthen him upon the bed of languishing: thou wilt make all his bed in his sickness."},
    house:{ref:"Joshua 24:15",t:"...but as for me and my house, we will serve the LORD."},
    mourn:{ref:"Matthew 5:4",t:"Blessed are they that mourn: for they shall be comforted."},
    remember:{ref:"Philippians 1:3",t:"I thank my God upon every remembrance of you."},
    comfortless:{ref:"John 14:18",t:"I will not leave you comfortless: I will come to you."},
    season:{ref:"Ecclesiastes 3:1",t:"To every thing there is a season, and a time to every purpose under the heaven."},
    wings:{ref:"Psalm 63:7",t:"Because thou hast been my help, therefore in the shadow of thy wings will I rejoice."},
    perfect:{ref:"Isaiah 26:3",t:"Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee."},
    peaceU:{ref:"Philippians 4:7",t:"And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus."},
    times:{ref:"Psalm 31:15",t:"My times are in thy hand."},
    nigh:{ref:"Psalm 145:18",t:"The LORD is nigh unto all them that call upon him, to all that call upon him in truth."},
    yoke:{ref:"Matthew 11:29",t:"Take my yoke upon you, and learn of me; for I am meek and lowly in heart: and ye shall find rest unto your souls."},
    friend:{ref:"Proverbs 17:17",t:"A friend loveth at all times, and a brother is born for adversity."},
    peacemakers:{ref:"Matthew 5:9",t:"Blessed are the peacemakers: for they shall be called the children of God."},
    morrow:{ref:"Matthew 6:34",t:"Take therefore no thought for the morrow: for the morrow shall take thought for the things of itself."},
    strength:{ref:"Deuteronomy 33:25",t:"...as thy days, so shall thy strength be."},
    care:{ref:"1 Peter 5:7",t:"Casting all your care upon him; for he careth for you."},
    burdens:{ref:"Galatians 6:2",t:"Bear ye one another's burdens, and so fulfil the law of Christ."},
    flesh:{ref:"Psalm 73:26",t:"My flesh and my heart faileth: but God is the strength of my heart, and my portion for ever."}
  });
  const L = ["lost_spouse", "lost_child", "lost_parent", "lost_friend"], LP = L.concat(["lost_pet"]);
  const MORE = [
    {c:"morning",ti:"A New Morning",x:"Lord, thank You for this new morning and for the breath in my body. I do not know everything this day will bring, but I know You are already in it. Help me to walk slowly, to speak kindly, and to notice the small gifts You place along the way. I give You this day.",v:"day",th:["gratitude"]},
    {c:"morning",ti:"Strength for Today",x:"Father, my body is not what it once was, and some mornings are slow. Give me just enough strength for what today truly asks of me. Help me to rest without guilt and to move without fear. Let me lean on You, one step at a time.",v:"strength",th:["health"]},
    {c:"morning",ti:"Not Alone This Morning",x:"Lord, the house is quiet this morning. Remind me that I am never truly alone, because You are here with me. Send someone across my path today whom I can smile at, or who might smile at me. Fill the silence with Your gentle company.",v:"never",th:["lonely"]},
    {c:"morning",ti:"Cast My Cares",x:"Lord, before my worries wake up fully, I bring them to You. You know the things that weigh on me, even the ones I cannot name. I place them in Your hands and ask You to carry what I cannot. Give me a steady heart for this day.",v:"care",th:["anxiety"]},
    {c:"morning",ti:"Mercies Made New",x:"Lord, I have not always felt close to You. Yet each morning You offer Your mercy again, fresh and patient. Help me to turn toward You today, even with a small and simple prayer. Thank You for never giving up on me.",v:"mercies",th:["faith"]},
    {c:"morning",ti:"For the Ones Who Need Me",x:"Lord, today I will care for someone who needs me. Give me patience when I am tired and gentleness when I am worried. Let my hands be kind and my words be soft. And when I have nothing left, please be my strength.",v:"burdens",th:["caregiver"]},
    {c:"morning",ti:"Daily Bread",x:"Father, You know what I need before I ask. I bring You my worries about money and the bills that sit on the table. Help me to be wise with what I have and grateful for what is enough. Provide for me today, as You always have.",v:"bread",th:["money"]},

    {c:"noon",ti:"Stopping at Midday",x:"Lord, I stop for a moment in the middle of this day. Thank You for what has already gone well, and forgive me for what has not. Quiet my thoughts and settle my heart. Walk with me through the rest of the hours.",v:"still",th:[]},
    {c:"noon",ti:"When the Day Feels Heavy",x:"Father, the day feels heavy right now. Help me to breathe slowly and remember that You are near. I do not need to solve everything at once. Give me peace for this hour, and then for the next.",v:"rest",th:["anxiety"]},
    {c:"noon",ti:"For My Health",x:"Lord, I bring You my body with all its aches and worries. Guide the hands of those who care for me, and give me patience with myself. Help me to do what is good for me today. I trust myself to Your care.",v:"flesh",th:["health"]},
    {c:"noon",ti:"A Kind Word",x:"Lord, if I can, help me reach out to someone today, with a call, a note, or a kind word. Open a door for friendship, even a small one. And when no one calls, let me feel Your warmth. Thank You for being my friend.",v:"friend",th:["lonely"]},
    {c:"noon",ti:"Peace in the Family",x:"Father, there is tension in my family, and it hurts my heart. Soften what has grown hard between us. Help me to listen more than I speak and to forgive as I have been forgiven. Bring peace where I cannot.",v:"peacemakers",th:["family"]},
    {c:"noon",ti:"Enough for Now",x:"Lord, help me not to worry about tomorrow's money today. Show me what is enough and help me find contentment in it. Bless the little I have and let me share where I can. I trust You to provide.",v:"morrow",th:["money"]},
    {c:"noon",ti:"Thank You",x:"Lord, I simply want to say thank You. For food, for light through the window, for memories, and for this moment. I do not need to ask for anything right now. I just want to be grateful with You.",v:"good",th:["gratitude"]},

    {c:"evening",ti:"When the Day Is Done",x:"Lord, the day is ending and I give it back to You. Thank You for the good moments, and forgive me where I fell short. Let me lay down every worry before I sleep. Keep me and those I love safe tonight.",v:"sleep",th:["gratitude","sleep"]},
    {c:"evening",ti:"For Restful Sleep",x:"Father, sleep does not always come easily to me. Quiet my busy mind and relax my tired body. If I wake in the night, let my first thought be of You. Watch over me until the morning.",v:"sleepP",th:["sleep"]},
    {c:"evening",ti:"When the Night Is Long",x:"Lord, the evenings can feel long and lonely. Sit with me in this quiet room. Let me remember the people who have loved me and the ways You have kept me. I am not forgotten, and I am not alone.",v:"shepherd",th:["lonely","sleep"]},
    {c:"evening",ti:"Remembering {lost}",x:"Lord, tonight I think of {lost}. I remember them, I thank You for them, and I entrust them to Your care. Hold my sadness gently, together with all the love we shared. Help me rest tonight.",v:"heal",th:L},
    {c:"evening",ti:"Letting Go of Worry",x:"Lord, I do not want to carry today's worries into the night. I give You each one, one at a time. What I cannot change, I leave with You. Grant me Your peace as I close my eyes.",v:"peace",th:["anxiety","sleep"]},
    {c:"evening",ti:"For the One I Care For",x:"Father, I have cared for someone today, and I am tired. Bless them with rest and comfort tonight. Bless me too, with sleep that restores. Forgive my impatience and thank You for the love that keeps us going.",v:"wait",th:["caregiver"]},
    {c:"evening",ti:"Coming Home to You",x:"Lord, I feel far from You tonight, and I do not always know how to pray. So I simply turn toward You now. Thank You that You hear even the quietest words. Draw me close as I rest.",v:"near",th:["faith"]},

    {c:"family",ti:"For My Family",x:"Lord, I lift up my family to You, near and far. Watch over each one, especially those who are struggling. Keep us connected by love, even when life pulls us apart. Thank You for every one of them.",v:"bless",th:["family"]},
    {c:"family",ti:"For Someone I Love",x:"Lord, I bring someone I love before You today. Guard their steps, guide their choices, and give them joy. Where I cannot be with them, please be with them. Thank You for the gift they are to me.",v:"keepgo",th:["family"]},
    {c:"family",ti:"For My Grandchildren",x:"Father, bless my children and grandchildren. Let them grow in kindness, courage, and faith. Protect them from harm and help them know they are loved. May my life be a gentle example to them.",v:"crown",th:["family"]},
    {c:"family",ti:"For My Faithful Companion",x:"Lord, thank You for my faithful companion. Thank You for the comfort of their presence and the joy they bring to my days. Help me to care for them well. Keep us both well and content together.",v:"mercyAll",th:["pet"]},
    {c:"family",ti:"Mending What Is Broken",x:"Lord, some of my family relationships are strained. I do not know how to fix them, but You do. Give me courage to take a small step toward peace. Heal what words have wounded.",v:"kind",th:["family"]},
    {c:"family",ti:"For Someone Who Is Unwell",x:"Lord, I pray for someone I love who is not well. Comfort them in pain and calm them in fear. Give wisdom to those who treat them and strength to those who sit beside them. Hold them close.",v:"bed",th:["health","caregiver"]},
    {c:"family",ti:"A Home of Love",x:"Father, bless this home, whether it is full or quiet. Let it be a place of welcome, prayer, and rest. Thank You for the memories that live within these walls. May Your peace remain here.",v:"house",th:["family","gratitude"]},

    {c:"grief",ti:"I Miss {lost}",x:"Lord, I miss {lost} so much today. I remember them, I thank You for them, and I entrust them to Your care. You know the shape of the empty place they left. Please stay close to me in it.",v:"mourn",th:L},
    {c:"grief",ti:"When Grief Comes in Waves",x:"Father, grief comes over me in waves, sometimes when I least expect it. Let me not be ashamed of my tears. Hold me when the wave is high and steady me when it passes. Thank You for staying.",v:"broken",th:LP},
    {c:"grief",ti:"Thank You for the Life of {lost}",x:"Lord, thank You for the life of {lost}. Thank You for their laugh, their kindness, and the years we shared. I remember them, I thank You for them, and I entrust them to Your care. Help me carry their love forward.",v:"remember",th:L},
    {c:"grief",ti:"The Empty Chair",x:"Lord, there is an empty chair in my home and in my heart. Some days I do not know what to do with the quiet. Sit with me, Lord, and be my comfort. Give me one gentle reason to smile today.",v:"comfortless",th:L.concat(["lonely"])},
    {c:"grief",ti:"For a Beloved Friend",x:"Lord, I miss my dear companion, {lost}. They were a part of my everyday life, and the house feels different without them. Thank You for the love and loyalty they gave me. Comfort me in this loss.",v:"season",th:["lost_pet"]},
    {c:"grief",ti:"One Day at a Time",x:"Father, I do not need to be strong for the whole year, only for today. Help me through this one day. Let me eat, rest, and accept kindness from others. Carry me where I cannot walk.",v:"joy",th:LP},
    {c:"grief",ti:"Holding Their Memory",x:"Lord, I hold the memory of {lost} close to my heart. I remember them, I thank You for them, and I entrust them to Your care. Let my love for them become kindness toward others. Give me peace in remembering.",v:"wings",th:L},

    {c:"peace",ti:"Simply Peace",x:"Lord, I do not have many words today. I only want Your peace. Let it settle over me like evening light. Thank You for being here.",v:"perfect",th:["gratitude","anxiety"]},
    {c:"peace",ti:"Quiet Waters",x:"Lord, lead me beside still waters today. Quiet the noise inside me and around me. Restore what is tired in my soul. I rest in Your care.",v:"shepherd",th:["anxiety"]},
    {c:"peace",ti:"A Grateful Heart",x:"Father, give me a grateful heart. Let me count my blessings slowly, one by one. Even in hard seasons, there is goodness to notice. Thank You for every one of them.",v:"thanks",th:["gratitude"]},
    {c:"peace",ti:"Peace Beyond Understanding",x:"Lord, I bring You my requests with thanksgiving. I cannot understand everything that happens, but I can trust You. Guard my heart and mind today. Let Your peace be greater than my fear.",v:"peaceU",th:["anxiety"]},
    {c:"peace",ti:"Held in Your Hands",x:"Lord, my times are in Your hands. The years behind me and the days ahead are all known to You. I do not need to fear the future. I rest in Your keeping.",v:"times",th:["health","anxiety"]},
    {c:"peace",ti:"Close to You",x:"Lord, help me to know You are close, even when I do not feel it. Teach me to pray in simple ways. Let this small moment be enough. I am glad to be with You.",v:"nigh",th:["faith"]},
    {c:"peace",ti:"Rest for My Soul",x:"Father, I have been carrying so much for so long. Let me set it down for a few minutes. Give my soul rest and my body ease. Thank You for loving me as I am.",v:"yoke",th:["caregiver"]}
  ];
  MORE.forEach(function (p) { P.push(p); });
  if (typeof render === "function") render();
})();
