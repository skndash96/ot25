import payloadConfig from "@/payload.config"
import { getPayload } from "payload"

const admins = [
  {
    "name": "Aarya Dogra",
    "email": "aaryadogra@ot.in",
  },
  {
    "name": "Abhijith",
    "email": "abhijith@ot.in",
  },
  {
    "name": "Abhinav Anand",
    "email": "abhinavanand@ot.in",
  },
  {
    "name": "Abirami Kannan",
    "email": "abiramikannan@ot.in",
  },
  {
    "name": "Aditya Chanchpara",
    "email": "adityachanchpara@ot.in",
  },
  {
    "name": "Aditya Choudhary",
    "email": "adityachoudhary@ot.in",
  },
  {
    "name": "Afnidha",
    "email": "afnidha@ot.in",
  },
  {
    "name": "Akshay k",
    "email": "akshayk@ot.in",
  },
  {
    "name": "Ankit kumar",
    "email": "ankitkumar@ot.in",
  },
  {
    "name": "Arathi Krishna",
    "email": "arathikrishna@ot.in",
  },
  {
    "name": "B Buvan Kumar",
    "email": "bbuvankumar@ot.in",
  },
  {
    "name": "Buvanesh Pulugarajan",
    "email": "buvaneshpulugarajan@ot.in",
  },
  {
    "name": "D Krish Arya Kalathoki",
    "email": "dkrisharyakalathoki@ot.in",
  },
  {
    "name": "Dash Skndash S",
    "email": "dashskndashs@ot.in",
  },
  {
    "name": "Dhavedha Darshini",
    "email": "dhavedhadarshini@ot.in",
  },
  {
    "name": "Febin",
    "email": "febin@ot.in",
  },
  {
    "name": "Gagan",
    "email": "gagan@ot.in",
  },
  {
    "name": "Harinish",
    "email": "harinish@ot.in",
  },
  {
    "name": "Harish Annavisamy",
    "email": "harishannavisamy@ot.in",
  },
  {
    "name": "Harish Senthilkumar",
    "email": "harishsenthilkumar@ot.in",
  },
  {
    "name": "Jonathan",
    "email": "jonathan@ot.in",
  },
  {
    "name": "Jothi roshini",
    "email": "jothiroshini@ot.in",
  },
  {
    "name": "K.S.Shivani",
    "email": "k.s.shivani@ot.in",
  },
  {
    "name": "Lokman Chirania",
    "email": "lokmanchirania@ot.in",
  },
  {
    "name": "MAVURU SAI SHASHANK",
    "email": "mavurusaishashank@ot.in",
  },
  {
    "name": "Mahani",
    "email": "mahani@ot.in",
  },
  {
    "name": "Mohamed Ali Shakir",
    "email": "mohamedalishakir@ot.in",
  },
  {
    "name": "Muskaan Agarwal",
    "email": "muskaanagarwal@ot.in",
  },
  {
    "name": "Namya",
    "email": "namya@ot.in",
  },
  {
    "name": "Navya Srivastava",
    "email": "navyasrivastava@ot.in",
  },
  {
    "name": "Nikhil Gowtham",
    "email": "nikhilgowtham@ot.in",
  },
  {
    "name": "Nikita",
    "email": "nikita@ot.in",
  },
  {
    "name": "Nikitha G",
    "email": "nikithag@ot.in",
  },
  {
    "name": "Niranjana Gopalakrishnan",
    "email": "niranjanagopalakrishnan@ot.in",
  },
  {
    "name": "Nishitha",
    "email": "nishitha@ot.in",
  },
  {
    "name": "Nithin Sanjay",
    "email": "nithinsanjay@ot.in",
  },
  {
    "name": "Pavithra V P",
    "email": "pavithravp@ot.in",
  },
  {
    "name": "Piyush R Iyyengar",
    "email": "piyushriyyengar@ot.in",
  },
  {
    "name": "Prajakta",
    "email": "prajakta@ot.in",
  },
  {
    "name": "R Vikas Sairam",
    "email": "rvikassairam@ot.in",
  },
  {
    "name": "Rajadharshini V S",
    "email": "rajadharshinivs@ot.in",
  },
  {
    "name": "Ramswaroop S",
    "email": "ramswaroops@ot.in",
  },
  {
    "name": "Roshan Ram S A",
    "email": "roshanramsa@ot.in",
  },
  {
    "name": "Sadhana",
    "email": "sadhana@ot.in",
  },
  {
    "name": "Sanjeeva Siddharth S",
    "email": "sanjeevasiddharths@ot.in",
  },
  {
    "name": "Sarvesh v",
    "email": "sarveshv@ot.in",
  },
  {
    "name": "Sharvesh Kumar",
    "email": "sharveshkumar@ot.in",
  },
  {
    "name": "Shreya",
    "email": "shreya@ot.in",
  },
  {
    "name": "Sivadev",
    "email": "sivadev@ot.in",
  },
  {
    "name": "Sreeharshini",
    "email": "sreeharshini@ot.in",
  },
  {
    "name": "Sriram",
    "email": "sriram@ot.in",
  },
  {
    "name": "Sudharsan Ranganathan",
    "email": "sudharsanranganathan@ot.in",
  },
  {
    "name": "Sujay Ram K S",
    "email": "sujayramks@ot.in",
  },
  {
    "name": "Tushar Rai",
    "email": "tusharrai@ot.in",
  },
  {
    "name": "Ujaan",
    "email": "ujaan@ot.in",
  },
  {
    "name": "Vetrikumaran K",
    "email": "vetrikumarank@ot.in",
  },
  {
    "name": "Vishnu Kritik",
    "email": "vishnukritik@ot.in",
  },
  {
    "name": "Vraja",
    "email": "vraja@ot.in",
  },
  {
    "name": "sarveshvaran T R",
    "email": "sarveshvarantr@ot.in",
  }
]

async function main() {
  const payload = await getPayload({
    config: payloadConfig
  })

  for (const admin of admins) {
    try {
      await payload.create({
        collection: 'admins',
        data: {
          name: admin.name,
          email: admin.email,
          password: "designdesignah"
        }
      })

      console.log(`Added ${admin.email}`)
    } catch (e) {
      console.error(`Error creating admin ${admin.email}:`, e)
    }
  }
}

main().then(() => {
  console.log("Admins seeded")
  process.exit(0)
})