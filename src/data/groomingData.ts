import { Service, AddOn, Barber, DateOption, AppointmentPass } from '../types';

export const BRAND_LOGO = "https://lh3.googleusercontent.com/aida/AEtjO1VFa6TjjLic-BMo0YJ4gzHfMzS0_1gGh3ovgZbfqW6A4ddfH7R1W9-Jxw5y7XauiqA72SLhVYf5NE9tl-bf-2oKhUJ7S_EvKdNZbNn97LfVGZGKlpmnol2Jks7GBFqkGfm--hjW9hzjS1hr19DnOgGQ9h9xZKwpzrvE3N8CjhudkVKOpm6Qi1ZNXCnEgfNZ2z8NBIoABhpxv4EOwSoW0w3H3lShxbFSaAAfgI7zpWUd_k4R3Kx_L8UwbKOX";

export const USER_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuC-f33GjoGJFLyMz5EAPvbJ-45WEJMLuL_ceqVmfCPiFWh1NhoR-wwllV08UJOnc7oif3jkUIu1j1l91jBdRBlLO4MjFVt5LFFrc1tZPyXBK72WXIkKsxkPjpzzE-ecUR2gEV7lmhXUylvHwwjiJYfMp2mvIa3dIjNG_gidZyfwgKkcy33HFNsBsFoS2W0XDeEDikDNpOsKhcSG5A2ZCuoTE7rs8O90zE3hiZQ4yAkk4JPDwBHI7iUZdg";

export const SERVICES: Service[] = [
  {
    id: 'mora-signature-cut',
    title: 'The MORA Signature Cut',
    category: 'haircut',
    duration: 45,
    price: 65,
    badge: 'Signature',
    description: 'Precision scissor & clipper cut tailored to your bone structure. Includes aromatic botanical scalp wash, hot eucalyptus neck shave, and bespoke matte pomade finish.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwqfhKHY02zwOTs7yVhdkpBfMGjaP8MtFQzYan2LR1fZR4hMLNP5jyiAFSdpZZQixnlTKCrlYNtjf4h-vySOEVKNIXC1ilaLVGAHJ3WktZUQryA45h7S6m-dLsVVZyC9UCyt6l6dpwx5eBGlYizVXvNXuaL3wTmtRyyFHWhMZvd92ZDtEgxcHPbGGXXnJfUQoV3COl38vcRFVrGm33seBJRodd6RD52r5gzSOy50eMxnuQNhJnfTzCqw',
    imageAlt: 'Editorial portrait in a dark moody barbershop showing a sharp master barber cutting textured gentleman hair with steel shears under focused warm directional amber light',
    perks: [
      { icon: 'verified', label: 'Master Barber', isPrimary: true },
      { icon: 'wash', label: 'Wash Included' }
    ],
    actionText: 'Select'
  },
  {
    id: 'traditional-straight-razor-shave',
    title: 'Traditional Straight Razor Shave',
    category: 'shave',
    duration: 40,
    price: 50,
    description: 'Multi-stage hot towel infusion with cedarwood oils, badger brush warm lather, Japanese steel straight razor pass, and finished with a cold marble stone pore-sealing press.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASxBikRv72fp7WitgK_O-8nwimwsblUU13gGmdv1Qy-YuWb1_ewzgySe3_BiTV1gsqKMnSXPnsqZJ10R-e1afNcZ3T1JFP_6v4ggzfio3lWKrEW99bsQCUeQpTc0UXQ3l_hDSVp1jq6fcxb2_r49-Yx1V1j6AF8OJmF-xDVNv6L8Ra0x7xIF3P3UJws2ohP6hHS1bk1DX_AJP1N_heGxbwzoTgXFuYKmGlayOuwCLC9i8QVyaBINl6pQ',
    imageAlt: 'Close up artisan barbershop view of warm badger hair brush lathering rich white shaving cream on chin with steaming towels and glistening open straight razor blade',
    perks: [
      { icon: 'hot_tub', label: 'Hot Towel Ritual', isSecondary: true }
    ],
    actionText: 'Select'
  },
  {
    id: 'the-gentlemans-reset',
    title: 'The Gentleman’s Reset',
    category: 'combo',
    duration: 90,
    price: 145,
    originalPrice: 175,
    badge: 'Client Favorite',
    description: 'The comprehensive ritual: Signature Haircut + Full Hot Lather Shave + Clarifying Scalp Exfoliation + Warm Paraffin Hand Grooming treatment.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDW2K9M435-GkpqQM5veXXLHJxaV2yV828pbRG7SdtR7YgRM3DCU7bUHnUkj4zmkdL1CUZUjcdIvYLbWnmddrGQhzwFmoHk4FcCvwzGSwtWKylAkaLEMSjaA8QO1uK8UxDV50lTGyXKTuxjy0DzH_F9CgzZUTpPlZCvWyfwOkZCX4NqkvPDJT15DGqJjmhWohtg9RBaOeTflq_ueQudYVfAKU_Hhk2IcAFzZREPIgw9eMEt9wIZf9ReA',
    imageAlt: 'High end luxury spa treatment room for men with subtle bronze lighting, comfortable leather recliner, grooming glassware, glass decanter of amber scotch whisky resting on black slate table',
    tags: ['Haircut', 'Hot Shave', 'Scalp Care', 'Hand Treatment'],
    perks: [
      { icon: 'liquor', label: 'Double Scotch Included', isSecondary: true }
    ],
    actionText: 'Book Reset'
  },
  {
    id: 'beard-sculpt-hydro-hydration',
    title: 'Beard Sculpt & Hydro-Hydration',
    category: 'shave',
    duration: 35,
    price: 45,
    description: 'Architectural edge lineup, organic jojoba & shea beard butter massage, followed by penetrating warm ozone steam therapy for ultimate softness.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6p6yEO-1baM7J3xUPtQ0ccpO4dP-uc0tLjgJmylzqfYjroWYXivwk-46hvqUYE3LpsNlwA13mePaSnqkBq4xBqYzXivNgMdoajGaZv_7u3ih1ZdgNKG4tCb9QkosO1WZcxL8qOxxB_S9jYQs9xtueLDag9p5EJXaeUrM1Vi-6uCvuVBzSavhBGqxiuz5Di9cig2_ESrRrdjFQDN4dlc0rk8vAvevrDn3fHg5KGJ8GCYQEzeVHPMOfyw',
    imageAlt: 'Macro portrait of a groomed male jawline with a crisp defined beard trim line, soft mist from an ozone steamer softly illuminating skin texture',
    perks: [
      { icon: 'air', label: 'Ozone Infusion', isSecondary: true }
    ],
    actionText: 'Select'
  },
  {
    id: 'charcoal-detox-facial',
    title: 'Charcoal Detox Facial',
    category: 'facial',
    duration: 30,
    price: 55,
    description: 'Targeted pore vacuum extraction, active black clay deep-cleansing mask, chilled chamomile compress, and anti-fatigue peptide moisturizer.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCT16_MK-Z4UtJqBNK5AciccVKPJ58-buLmqTBN8Dd8XHoTTEbO-TgTTJtJK_65SN7vBqpUdcHaQQ7T1rrpRrKuQkM_uzXjlMQdPWr7Q73eHuP_2UhC-trhPz3_4ck4GhqJBdkhoiMtLGqaN9kVgXXc-Ecyyb034cyWNzfLD8GDN45Oflk1bBBRHRgfl1fzgpJMV7R9eEJYykRWKufKDCjOj_IW_SAlQvlnWAY1w9kB2fZekBv5R6SHUw',
    imageAlt: 'Minimalist luxury skincare setup with matte black clay mask bowl, organic wooden applicator, dark obsidian chilled stones and glass dropper on dark granite countertop',
    perks: [
      { icon: 'spa', label: 'Deep Skin Renewal', isPrimary: true }
    ],
    actionText: 'Select'
  }
];

export const ADD_ONS: AddOn[] = [
  {
    id: 'grey-camo-blending',
    title: 'Grey Camo Blending',
    description: 'Natural subtle tone integration (15 min)',
    price: 25,
    durationMinutes: 15
  },
  {
    id: 'peppermint-scalp-scrub',
    title: 'Peppermint Scalp Scrub',
    description: 'Deep exfoliating detox & circulation boost (10 min)',
    price: 20,
    durationMinutes: 10
  },
  {
    id: 'nose-ear-hard-wax',
    title: 'Nose & Ear Hard Wax',
    description: 'Gentle chamomile infused hard wax (10 min)',
    price: 15,
    durationMinutes: 10
  }
];

export const BARBERS: Barber[] = [
  {
    id: 'marcus',
    name: 'Marcus Vance',
    role: 'DIRECTOR',
    roleBadgeType: 'director',
    rating: 4.98,
    reviewCount: 420,
    nextAvailable: 'Today 4:15 PM',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvuQWiybIYfTzQJdqPRJc6e_cDZCGlM8DPqo_GV0C2qmpKt1UXkiDBUnKRfFrDFg7Z1ZWxUnIVbHTHztNMY6crz5meN41vhOAtvxTnbuB7YIIyruBPTZ5Ev9HAtVuoTGzosHMbfIYGcAy8E6E6AtsTlntFybC8Iu6nkZEoAFKVXI_CgX5S-jftCht04lqxInIrQa2KJ7wbl6sXYL0Fhq8HvCJk_97sXBYhhhPOdjppvHrlxKY4hBXISA'
  },
  {
    id: 'julian',
    name: 'Julian Diaz',
    role: 'ARCHITECT',
    roleBadgeType: 'architect',
    rating: 4.92,
    reviewCount: 310,
    nextAvailable: 'Tomorrow 11:00 AM',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3m-9Jax99RcEBsDDUXUAYRw49T0fb2JAcvXW67msok0IvJ8U1Dda8t7AtCdgW7XdboNp6rlf_Yz8uP3k_AKUqrfv2g3knmnFDyu0Jj3ba5f0amX90ki7NqtZRxTQbI_B59v3JEHnTN0JR237tuVNzXvkBlYxNJMDMVY8fTDCPsKRrNZiRo5snzi3N7OtH1H2dKHgSKOxb5VBAK1OscbCAZYd9JYqEQT37IKS2JKcVcTQ8pqnbdICUcQ'
  },
  {
    id: 'christian',
    name: 'Christian Cole',
    role: 'SHAVE MASTER',
    roleBadgeType: 'shave-master',
    rating: 4.95,
    reviewCount: 280,
    nextAvailable: 'Today 5:30 PM',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGKDoXKUfxQSvM8lbFsZwvR42I8N4ZkwSnkPROihS7iHW1jbkmBGLU4oqk9-fcHmpZ9fyYHp-n09gdsQHe0ItHUhCT3QAyOKbVaLql72ginugbgHRocPgMRjL7xITgwz623EcDsbPR1ZEN0K0Fl1TwcLlftnWVGe0FD-SW43d28HczBldWMy7AqhqFcRjvXWUnRb-Zwlo-sCb6_26lDfp4kjPHTj4qWU7yTknYoirRnSL-ocR1n5z3Hg'
  },
  {
    id: 'any',
    name: 'First Open Master Barber',
    role: 'FAST-TRACK',
    rating: 4.96,
    reviewCount: 1010,
    nextAvailable: 'Earliest Accommodation',
    avatar: '',
    isAny: true
  }
];

export const DATE_OPTIONS: DateOption[] = [
  { dayOfWeek: 'Mon', dayNumber: 14, month: 'October', year: 2024, dateKey: 'mon-14' },
  { dayOfWeek: 'Tue', dayNumber: 15, month: 'October', year: 2024, dateKey: 'tue-15' },
  { dayOfWeek: 'Wed', dayNumber: 16, month: 'October', year: 2024, dateKey: 'wed-16' },
  { dayOfWeek: 'Thu', dayNumber: 17, month: 'October', year: 2024, dateKey: 'thu-17' },
  { dayOfWeek: 'Fri', dayNumber: 18, month: 'October', year: 2024, dateKey: 'fri-18' },
  { dayOfWeek: 'Sat', dayNumber: 19, month: 'October', year: 2024, dateKey: 'sat-19' }
];

export const TIME_SLOTS_AFTERNOON = ['2:00 PM', '2:45 PM', '3:30 PM', '4:15 PM', '5:00 PM'];
export const TIME_SLOTS_EVENING = ['6:00 PM', '6:45 PM', '7:30 PM'];

export const INITIAL_PASSES: AppointmentPass[] = [
  {
    id: 'pass-sample-1',
    bookingCode: 'MORA-8924-VIP',
    status: 'confirmed',
    createdAt: '2024-10-12T14:20:00Z',
    booking: {
      service: SERVICES[0],
      selectedAddOns: [ADD_ONS[1]],
      barber: BARBERS[0],
      date: DATE_OPTIONS[1], // Tue 15
      timeSlot: '3:30 PM',
      hospitalityNote: '12-Year Highland Single Malt on hand cut rock',
      totalPrice: 85
    }
  }
];
