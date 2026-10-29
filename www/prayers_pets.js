/* Quiet Prayers: Pets tab. 45 original prayers for dogs, cats and other animals (living, sick, old, lost),
   plus the pet prayers written earlier, moved under one tab. Appended at the end so saved ids stay stable. */
(function () {
  "use strict";
  Object.assign(V, {
    p_sparrow:{ref:"Matthew 10:29",t:"Are not two sparrows sold for a farthing? and one of them shall not fall on the ground without your Father."},
    p_forgot:{ref:"Luke 12:6",t:"Are not five sparrows sold for two farthings, and not one of them is forgotten before God?"},
    p_ravens:{ref:"Psalm 147:9",t:"He giveth to the beast his food, and to the young ravens which cry."},
    p_eyes:{ref:"Psalm 145:15-16",t:"The eyes of all wait upon thee; and thou givest them their meat in due season. Thou openest thine hand, and satisfiest the desire of every living thing."},
    p_wisdom:{ref:"Psalm 104:24",t:"O LORD, how manifold are thy works! in wisdom hast thou made them all: the earth is full of thy riches."},
    p_good:{ref:"Genesis 1:25",t:"And God made the beast of the earth after his kind, and cattle after their kind... and God saw that it was good."},
    p_teach:{ref:"Job 12:7",t:"But ask now the beasts, and they shall teach thee; and the fowls of the air, and they shall tell thee."},
    p_hills:{ref:"Psalm 50:10-11",t:"For every beast of the forest is mine, and the cattle upon a thousand hills. I know all the fowls of the mountains: and the wild beasts of the field are mine."},
    p_lambs:{ref:"Isaiah 40:11",t:"He shall feed his flock like a shepherd: he shall gather the lambs with his arm, and carry them in his bosom."},
    p_noah:{ref:"Genesis 8:1",t:"And God remembered Noah, and every living thing, and all the cattle that was with him in the ark."},
    p_covenant:{ref:"Genesis 9:16",t:"And the bow shall be in the cloud; and I will look upon it, that I may remember the everlasting covenant between God and every living creature of all flesh that is upon the earth."},
    p_nest:{ref:"Psalm 84:3",t:"Yea, the sparrow hath found an house, and the swallow a nest for herself, where she may lay her young, even thine altars, O LORD of hosts."},
    p_wings:{ref:"Psalm 91:4",t:"He shall cover thee with his feathers, and under his wings shalt thou trust."},
    p_restbeast:{ref:"Exodus 23:12",t:"Six days thou shalt do thy work, and on the seventh day thou shalt rest: that thine ox and thine ass may rest."},
    p_fowls:{ref:"Matthew 6:26",t:"Behold the fowls of the air: for they sow not, neither do they reap, nor gather into barns; yet your heavenly Father feedeth them."},
    p_lost:{ref:"Luke 15:4-5",t:"...doth not leave the ninety and nine in the wilderness, and go after that which is lost, until he find it? And when he hath found it, he layeth it on his shoulders, rejoicing."},
    p_names:{ref:"Genesis 2:19",t:"...and whatsoever Adam called every living creature, that was the name thereof."},
    p_groan:{ref:"Romans 8:22",t:"For we know that the whole creation groaneth and travaileth in pain together until now."},
    p_wolf:{ref:"Isaiah 11:6",t:"The wolf also shall dwell with the lamb, and the leopard shall lie down with the kid... and a little child shall lead them."},
    p_renew:{ref:"Psalm 104:30",t:"Thou sendest forth thy spirit, they are created: and thou renewest the face of the earth."},
    p_cattle:{ref:"Jonah 4:11",t:"And should not I spare Nineveh, that great city, wherein are more than sixscore thousand persons... and also much cattle?"},
    p_sheep:{ref:"John 10:14",t:"I am the good shepherd, and know my sheep, and am known of mine."}
  });

  const MORE = [
    // dogs
    {c:"pets",ti:"The dog who waited all day",x:"Lord, I was gone a few hours and he greeted me like I had been gone a year. Thank You for a creature who keeps no record of how long I was away, only that I came back. Teach me to welcome people the way my dog welcomes me.",v:"p_eyes",th:["pet","gratitude"]},
    {c:"pets",ti:"A puppy's first night",x:"Father, there is a small one crying in a box in my kitchen tonight, missing a mother it will not see again. Give me patience for the puddles and the chewing, and a soft voice for the crying. Let this house become home to him.",v:"p_names",th:["pet","family"]},
    {c:"pets",ti:"For the shelter dog nobody chose",x:"God, I keep thinking about the old dog at the back of the shelter, the one people walk past because he is grey and quiet. You do not walk past anyone. Send him a home, or give me the courage to be it.",v:"p_lost",th:["pet"]},
    {c:"pets",ti:"When the stairs are too much",x:"Lord, my dog stood at the bottom of the stairs tonight and looked up at me, and we both understood. So I carried him. Give me a strong back and a gentle heart for these last years, and let him never feel like a burden.",v:"p_lambs",th:["pet"]},
    {c:"pets",ti:"Fireworks and a frightened dog",x:"Father, the sky is cracking and my dog is trembling against my legs. I cannot explain to him that it will end. So I will sit on the floor with him until it does. Be our shelter tonight, the way I am his.",v:"p_wings",th:["pet","anxiety"]},
    {c:"pets",ti:"A walk in the rain",x:"God, it was raining and the dog did not care, so neither did I. Thank You for the wet grass, the smell of the earth, and a friend who finds every morning worth getting up for. Let me learn that from him.",v:"p_wisdom",th:["pet","gratitude"]},
    {c:"pets",ti:"The dog who grieves too",x:"Lord, he still goes to the window at the hour she used to come home. He still sleeps on her side of the bed. We are grieving the same person, in different languages. Comfort him in whatever way a dog can be comforted, and let us comfort each other.",v:"broken",th:["pet","lonely"]},
    {c:"pets",ti:"The dog asleep by the door",x:"Father, he has put himself between me and the door again, the way he does every night. He does not know what he is guarding against. He only knows I am behind him. Thank You for a loyalty I did nothing to earn.",v:"secret",th:["pet","sleep"]},
    {c:"pets",ti:"Feeding time",x:"God, the bowl goes down and the tail goes up, every single day, as if it were a miracle. Perhaps it is. Thank You for the food in his bowl and in my own, and for a creature who says grace with his whole body.",v:"p_ravens",th:["pet","gratitude"]},
    {c:"pets",ti:"For a dog gone grey around the muzzle",x:"Lord, his face is white now and his eyes are cloudy, but he still finds my hand. We have grown old together. Give him comfort in his bones and warmth in his bed, and give me the grace to walk slower.",v:"preserve",th:["pet"]},
    {c:"pets",ti:"The lessons my dog teaches me",x:"Father, my dog forgives in a second, rests when he is tired, and is glad about small things. I have had many more years than he has and I am still learning all three. Thank You for the teacher You put at my feet.",v:"p_teach",th:["pet","faith"]},
    {c:"pets",ti:"For a dog who is losing his sight",x:"God, he bumps into the chair now and I have stopped moving the furniture. He trusts the house, and he trusts me, and that is enough for him. Help me be his eyes, and keep his world steady.",v:"p_sheep",th:["pet","health"]},
    // cats
    {c:"pets",ti:"For the stray cat on the porch",x:"Lord, there is a thin cat who comes to the porch at dusk and will not let me near. I leave food. She eats when I am gone. Keep her safe tonight, and if she is meant to be mine, let her trust me a little more tomorrow.",v:"p_forgot",th:["pet"]},
    {c:"pets",ti:"A kitten in the house",x:"Father, there is a kitten climbing the curtains and nothing in this house is safe. Thank You for the energy of a brand-new life. Keep her from harm she is too small to understand, and keep my patience longer than her claws.",v:"p_good",th:["pet","family"]},
    {c:"pets",ti:"The cat who sits with me when I cry",x:"God, I did not call her, but she came and settled against me while I wept. She does not know why I am sad. She only knows I am warm and I am hers. Thank You for comfort that asks no questions.",v:"broken",th:["pet","lonely"]},
    {c:"pets",ti:"For a cat who is getting thin",x:"Lord, I can feel her bones when I stroke her now, and she sleeps more than she used to. I am afraid of what the vet will say. Give her ease, give me wisdom, and give us both whatever time is still good.",v:"heal",th:["pet","health"]},
    {c:"pets",ti:"The cat at the morning window",x:"Father, she is at the window again, watching the birds she will never catch, as content as any creature on earth. Thank You for a companion who teaches me to sit still and simply look at what You made.",v:"p_nest",th:["pet","gratitude"]},
    {c:"pets",ti:"The cat who will not come when called",x:"God, I called and she looked at me and went the other way. Yet tonight she will find my lap without being asked. Thank You for a creature who loves on her own terms and reminds me that love does not have to obey to be real.",v:"p_hills",th:["pet"]},
    // sickness and the vet
    {c:"pets",ti:"Before the surgery",x:"Lord, they are taking him in this morning and I had to hand over the leash and walk away. He looked back at me. Guide the hands of the vet, steady my own, and bring him home to the bed he knows.",v:"fear",th:["pet","anxiety"]},
    {c:"pets",ti:"The pill hidden in the cheese",x:"Father, twice a day I wrap a pill in something good and pray he does not notice. He usually does. Give me patience for the fuss, and let the medicine do its quiet work in him. Thank You for the people who made it.",v:"heal",th:["pet","caregiver"]},
    {c:"pets",ti:"For the vet and the nurses",x:"God, thank You for the people who chose to spend their lives with frightened animals and worried owners. Give them steady hands, soft voices and rest at the end of long days. Bless the one who will treat mine.",v:"beast",th:["pet"]},
    {c:"pets",ti:"Waiting for the test results",x:"Lord, the vet said she would call, and I have checked the phone eleven times. I cannot do anything but wait. So I will wait with You. Whatever the news, help me do what is kind, not what is easy.",v:"careful",th:["pet","anxiety"]},
    {c:"pets",ti:"The night I slept on the floor",x:"Father, I brought a blanket down and slept beside him on the floor, because he could not climb up to me. My back hurts and I would do it again. Remember him tonight, the way You remembered every creature in the ark.",v:"p_noah",th:["pet","caregiver"]},
    {c:"pets",ti:"For a lost pet",x:"God, the gate was open and now he is gone, and I have called his name down every street. You know where he is right now. Keep him from the road, send him a kind stranger, and bring him home to me.",v:"p_lost",th:["pet","anxiety"]},
    {c:"pets",ti:"For my pet while I am in hospital",x:"Lord, I am the one in the bed this time, and I keep thinking of him at home, wondering where I am. Bless the neighbor who is feeding him. Let him sense that I have not left him, and let me get back to him soon.",v:"p_eyes",th:["pet","health"]},
    {c:"pets",ti:"For a pet home alone today",x:"Father, I have to be out all day and she will spend it waiting by the door. Keep her calm and safe in the empty house. Let the hours pass quickly for her, and let me not be too tired to sit with her when I get home.",v:"secret",th:["pet"]},
    // saying goodbye (written without a name so they stay generic)
    {c:"pets",ti:"The hardest kindness",x:"Lord, the vet has said it is time, and I know she is right, and I still cannot say yes. Help me put his comfort before my own. Let the last thing he feels be my hand, and the last thing he hears be his name.",v:"p_lambs",th:["lost_pet"]},
    {c:"pets",ti:"The quiet at five o'clock",x:"Father, five o'clock was dinner time, and for twelve years something small came running. Tonight nothing came. I stood in the kitchen and did not know what to do with my hands. Sit with me in the quiet.",v:"tears",th:["lost_pet"]},
    {c:"pets",ti:"Was it only a dog",x:"God, people mean well when they say it was only a dog. But he was the one who was there every single day, when the children had gone and the phone was quiet. You counted every sparrow. I know You counted him.",v:"p_forgot",th:["lost_pet","lonely"]},
    {c:"pets",ti:"Thank You for every year",x:"Lord, I am grieving, so let me also give thanks. For the muddy paws and the stolen food and the warm weight against my legs on winter nights. For every year. He was a gift, and I knew it the whole time.",v:"thanks",th:["lost_pet","gratitude"]},
    {c:"pets",ti:"When the other pet looks for them",x:"Father, the cat keeps searching the house for the dog, room by room, and then she sits in his bed. I cannot explain it to her. Comfort the one who is left, and let us be enough for each other for now.",v:"heal",th:["lost_pet"]},
    {c:"pets",ti:"Ready to love again",x:"God, part of me says never again, it hurts too much. Part of me saw a face at the shelter today. You made my heart with room in it. If it is time, show me, and let me love the next one without comparing.",v:"joy",th:["lost_pet"]},
    {c:"pets",ti:"Every creature You made good",x:"Lord, You looked at the animals and called them good before You ever made us. I do not understand everything about where they go. I only know that You made him, You loved him, and You do not lose what You love.",v:"p_covenant",th:["lost_pet","faith"]},
    // other animals
    {c:"pets",ti:"For the birds at the feeder",x:"Father, the feeder is full and the sparrows have found it, arguing and flapping in the cold. You feed them, and this morning You let me help. Thank You for small wings outside my window and for a reason to fill the feeder again.",v:"p_fowls",th:["gratitude"]},
    {c:"pets",ti:"For the horses in the cold field",x:"God, I drove past the horses this morning standing with their backs to the wind. Keep them warm, keep them fed, and bless the farmer who goes out before dawn to see to them. You gave even the ox a day of rest.",v:"p_restbeast",th:[]},
    {c:"pets",ti:"For the animals on the farm",x:"Lord, thank You for the cattle, the chickens and the sheep that feed and clothe us without a word of complaint. Let them be treated with the kindness You asked of us. Every one of them is Yours before it is ours.",v:"p_hills",th:[]},
    {c:"pets",ti:"For a grandchild's small pet",x:"Father, my granddaughter has a hamster the size of my thumb and loves it with her whole heart. Keep the little thing alive and well, and if the day comes when it is not, give me the right words for her first goodbye.",v:"p_sparrow",th:["family"]},
    {c:"pets",ti:"For the goldfish nobody prays for",x:"God, there is a goldfish on the shelf who has outlived two cats and asks for nothing but a pinch of food. I am not sure anyone has ever prayed for him. So here it is. Thank You for every living thing, even the quiet ones.",v:"p_eyes",th:["family","gratitude"]},
    {c:"pets",ti:"For the animals in the storm",x:"Lord, the floods and the fires on the news are full of people, and behind them are animals no one can carry out. Dogs on rooftops, horses in the water, cats under the rubble. Remember them, as You remembered the ark.",v:"p_noah",th:[]},
    {c:"pets",ti:"For the animals in shelters tonight",x:"Father, somewhere tonight there are rows of cages and a hundred faces waiting for a door to open. Send people with room in their homes. Bless the ones who clean the cages and learn the names. Let no good creature wait too long.",v:"p_lost",th:[]},
    {c:"pets",ti:"For the people who rescue animals",x:"God, thank You for the ones who stop the car, climb the fence, and carry home what others left behind. They see what You see. Give them strength, give them help, and keep their hearts soft without breaking them.",v:"p_cattle",th:[]},
    {c:"pets",ti:"For the working dogs",x:"Lord, bless the dogs that lead the blind, find the lost, guard the flock and sit with the dying. They do holy work and do not know it. Give them good masters, long rests and a warm place at the end of every shift.",v:"p_teach",th:[]},
    {c:"pets",ti:"For the wild things in the garden",x:"Father, a deer stood at the edge of the garden this morning and looked at me, and for a moment we were both still. Thank You for the hedgehog, the fox and the birds I will never own. Let me share the garden gladly.",v:"p_wisdom",th:["gratitude"]},
    {c:"pets",ti:"When the whole creation groans",x:"God, the world is hard on the small and the voiceless. For every animal that is hungry, hurt or afraid tonight, I ask Your mercy. And give me one thing I can do this week to make it gentler for one of them.",v:"p_groan",th:["faith"]},
    {c:"pets",ti:"A blessing for all creatures before sleep",x:"Lord, bless the dog at my feet and the cat on the chair, the birds asleep in the hedge and the cattle in the dark fields. Bless every creature that breathes tonight. You made them all, and You are keeping them all.",v:"p_renew",th:["pet","sleep"]}
  ];
  MORE.forEach(function (p) { P.push(p); });

  // the pet prayers written earlier under "Family & pets" move to the Pets tab (same ids, so saved hearts stay)
  const MOVE = ["For my dog", "For an old dog", "When a pet is sick", "A puppy in the house", "For the one we rescued", "A cat on my lap",
    "Slow walks with an old friend", "The waiting room at the vet", "For the company at my feet", "When the thunder comes",
    "The dog who checks on me", "Saying goodnight to the dog", "For My Faithful Companion"];
  P.forEach(function (p) { if (p.c === "family" && MOVE.indexOf(p.ti) >= 0) p.c = "pets"; });

  // the Pets tab shows every animal prayer, including the morning/evening/thanks ones about a dog or cat,
  // and skips the profile filter (someone who taps Pets wants to see them)
  const PET_RE = /\b(dog|dogs|cat|cats|puppy|kitten|pet|pets|paws|leash|tail)\b/i;
  const isPet = function (p) {
    if (p.c === "pets") return true;
    const th = p.th || [];
    if (th.some(function (t) { return t.indexOf("lost_") === 0; }) || p.x.indexOf("{lost}") >= 0) return false;
    return th.indexOf("pet") >= 0 || PET_RE.test(p.ti) || PET_RE.test(p.x);
  };
  const baseList = window.list;
  window.list = function () {
    if (tab === "pets") {
      const living = P.filter(function (p) { return isPet(p) && (p.th || []).indexOf("lost_pet") < 0; });
      const gone = P.filter(function (p) { return p.c === "pets" && (p.th || []).indexOf("lost_pet") >= 0; });
      return living.concat(gone);
    }
    return baseList();
  };
  if (typeof render === "function") render();
})();
