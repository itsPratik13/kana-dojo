export interface EffectDefinition {
  id: string;
  name: string;
  emoji: string;
  description?: string;
}

// â”€â”€â”€ Japan-themed emoji pool â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export const CURSOR_TRAIL_EFFECTS: EffectDefinition[] = [
  { id: 'none', name: 'None', emoji: '', description: 'No cursor trail' },
  {
    id: 'sakura',
    name: 'Sakura Petals',
    emoji: 'ðŸŒ¸',
    description: 'Cherry blossom petals drift behind your cursor',
  },
  {
    id: 'maple',
    name: 'Momiji',
    emoji: 'ðŸ‚',
    description: 'Autumn maple leaves tumble and fall',
  },
  {
    id: 'bamboo',
    name: 'Bamboo',
    emoji: 'ðŸŽ‹',
    description: 'Tanabata bamboo leaves trail your movement',
  },
  {
    id: 'lantern',
    name: 'Lantern',
    emoji: 'ðŸ®',
    description: 'Paper lanterns float gently behind your cursor',
  },
  {
    id: 'lotus',
    name: 'Lotus',
    emoji: 'ðŸª·',
    description: 'Lotus flowers bloom in your wake',
  },
  {
    id: 'wave',
    name: 'Wave',
    emoji: 'ðŸŒŠ',
    description: 'Ocean waves ripple behind your cursor',
  },
  {
    id: 'sparkle',
    name: 'Sparkle',
    emoji: 'âœ¨',
    description: 'Shimmering sparkles trail your movement',
  },
  {
    id: 'star',
    name: 'Star',
    emoji: 'â­',
    description: 'Stars twinkle behind your cursor',
  },
  {
    id: 'snowflake',
    name: 'Snowflake',
    emoji: 'â„ï¸',
    description: 'Snowflakes drift gently behind your cursor',
  },
  {
    id: 'fish',
    name: 'Koi',
    emoji: 'ðŸŸ',
    description: 'Koi fish swim in a stream behind your cursor',
  },
  {
    id: 'butterfly',
    name: 'Butterfly',
    emoji: 'ðŸ¦‹',
    description: 'Butterflies flutter behind your cursor',
  },
  {
    id: 'moon',
    name: 'Moon',
    emoji: 'ðŸŒ™',
    description: 'Crescent moons trail your movement',
  },
  {
    id: 'fuji',
    name: 'Fuji',
    emoji: 'ðŸ—»',
    description: 'Mount Fuji icons trail behind your cursor',
  },
  {
    id: 'wind',
    name: 'Wind Chime',
    emoji: 'ðŸŽ',
    description: 'Wind chimes tinkle behind your cursor',
  },
  {
    id: 'rice',
    name: 'Onigiri',
    emoji: 'ðŸ™',
    description: 'Rice balls bounce behind your cursor',
  },
  {
    id: 'tea',
    name: 'Matcha',
    emoji: 'ðŸµ',
    description: 'Tea cups float behind your cursor',
  },
  {
    id: 'fan',
    name: 'Fan',
    emoji: 'ðŸª­',
    description: 'Folding fans flutter in your wake',
  },
  {
    id: 'blossom',
    name: 'Blossom',
    emoji: 'ðŸŒº',
    description: 'Hibiscus blossoms trail your cursor',
  },
  {
    id: 'torii',
    name: 'Torii',
    emoji: 'â›©ï¸',
    description: 'Shrine gates drift behind your cursor',
  },
  {
    id: 'dango',
    name: 'Dango',
    emoji: 'ðŸ¡',
    description: 'Dango skewers trail your movement',
  },
  {
    id: 'sushi',
    name: 'Sushi',
    emoji: '🍣',
    description: 'Sushi pieces glide behind your cursor',
  },
  {
    id: 'ramen',
    name: 'Ramen',
    emoji: '🍜',
    description: 'Ramen bowls swirl in your cursor wake',
  },
  {
    id: 'castle',
    name: 'Castle',
    emoji: '🏯',
    description: 'Japanese castles trail your movement',
  },
  {
    id: 'carp',
    name: 'Koinobori',
    emoji: '🎏',
    description: 'Carp streamers float behind your cursor',
  },
  {
    id: 'kitsune',
    name: 'Kitsune',
    emoji: '🦊',
    description: 'Fox spirits dart along your cursor path',
  },
  {
    id: 'chopsticks',
    name: 'Chopsticks',
    emoji: '🥢',
    description: 'Chopsticks flicker behind your cursor',
  },];

export const CLICK_EFFECTS: EffectDefinition[] = [
  { id: 'none', name: 'None', emoji: '', description: 'No click effect' },
  {
    id: 'sakura',
    name: 'Sakura Bloom',
    emoji: 'ðŸŒ¸',
    description: 'Cherry blossoms scatter from each click',
  },
  {
    id: 'maple',
    name: 'Momiji Rain',
    emoji: 'ðŸ‚',
    description: 'Maple leaves rain from the click point',
  },
  {
    id: 'bamboo',
    name: 'Bamboo',
    emoji: 'ðŸŽ‹',
    description: 'Tanabata bamboo bursts from each click',
  },
  {
    id: 'lantern',
    name: 'Lantern',
    emoji: 'ðŸ®',
    description: 'Paper lanterns burst outward on click',
  },
  {
    id: 'lotus',
    name: 'Lotus',
    emoji: 'ðŸª·',
    description: 'Lotus flowers blossom from each click',
  },
  {
    id: 'wave',
    name: 'Wave',
    emoji: 'ðŸŒŠ',
    description: 'Waves ripple outward from each click',
  },
  {
    id: 'sparkle',
    name: 'Sparkle',
    emoji: 'âœ¨',
    description: 'Sparkles burst from each click',
  },
  {
    id: 'star',
    name: 'Star Burst',
    emoji: 'â­',
    description: 'Stars explode from each click',
  },
  {
    id: 'snowflake',
    name: 'Snowflake',
    emoji: 'â„ï¸',
    description: 'Snowflakes scatter from each click',
  },
  {
    id: 'fish',
    name: 'Koi Splash',
    emoji: 'ðŸŸ',
    description: 'Koi fish scatter from each click',
  },
  {
    id: 'butterfly',
    name: 'Butterfly',
    emoji: 'ðŸ¦‹',
    description: 'Butterflies scatter from every click',
  },
  {
    id: 'firework',
    name: 'Firework',
    emoji: 'ðŸŽ†',
    description: 'Fireworks explode from each click',
  },
  {
    id: 'festival',
    name: 'Festival',
    emoji: 'ðŸŽŠ',
    description: 'Festival confetti bursts on each click',
  },
  {
    id: 'fuji',
    name: 'Fuji',
    emoji: 'ðŸ—»',
    description: 'Mount Fuji icons scatter on click',
  },
  {
    id: 'wind',
    name: 'Wind Chime',
    emoji: 'ðŸŽ',
    description: 'Wind chimes scatter on each click',
  },
  {
    id: 'rice',
    name: 'Onigiri',
    emoji: 'ðŸ™',
    description: 'Rice balls scatter on each click',
  },
  {
    id: 'tea',
    name: 'Matcha',
    emoji: 'ðŸµ',
    description: 'Tea cups scatter on each click',
  },
  {
    id: 'fan',
    name: 'Fan',
    emoji: 'ðŸª­',
    description: 'Folding fans scatter on each click',
  },
  {
    id: 'blossom',
    name: 'Blossom',
    emoji: 'ðŸŒº',
    description: 'Hibiscus blossoms burst from each click',
  },
  {
    id: 'torii',
    name: 'Torii',
    emoji: 'â›©ï¸',
    description: 'Shrine gates burst from each click',
  },
  {
    id: 'dango',
    name: 'Dango',
    emoji: 'ðŸ¡',
    description: 'Dango skewers scatter from each click',
  },
  {
    id: 'sushi',
    name: 'Sushi',
    emoji: '🍣',
    description: 'Sushi pieces burst from each click',
  },
  {
    id: 'ramen',
    name: 'Ramen',
    emoji: '🍜',
    description: 'Ramen bowls scatter from each click',
  },
  {
    id: 'castle',
    name: 'Castle',
    emoji: '🏯',
    description: 'Japanese castles burst from each click',
  },
  {
    id: 'carp',
    name: 'Koinobori',
    emoji: '🎏',
    description: 'Carp streamers fan out from each click',
  },
  {
    id: 'kitsune',
    name: 'Kitsune',
    emoji: '🦊',
    description: 'Fox spirits dart out from each click',
  },
  {
    id: 'chopsticks',
    name: 'Chopsticks',
    emoji: '🥢',
    description: 'Chopsticks scatter from each click',
  },];

