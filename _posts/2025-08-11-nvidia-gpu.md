---
layout: simple-post
title: "Why you can’t just copy NVIDIA’s GPUs"
date: 2025-08-11
author: Nathan Cavaglione
description: "Better wake up early"
image: "/assets/images/nvidia.webp"
---

<img src="/assets/images/nvidia.webp" style="max-width: 400px; width: 100%; height: auto; display: block; margin: 20px 0;">

You can copy a chip; you can’t copy the city around it. That, more than clock speeds or clever slides, is why NVIDIA - now valued in the 4.4 trillions - keeps its lead. The firm did not just build silicon; it laid roads, wrote the road signs, and taught everyone to drive on them.

Start with the language of the place. For two decades developers have learned to think in CUDA. The popular tools - PyTorch and TensorFlow - lean on it by default. Under the bonnet sit libraries with unsexy names (cuDNN for neural nets, cuBLAS for linear algebra, NCCL for multi-GPU teamwork) that most teams never see but always use. Higher up, deployment tools - TensorRT and Triton - turn models into production workhorses. Try to lift all that code to another brand of chip and you hit the small print: NVIDIA’s CUDA licence forbids translation layers that pretend to be CUDA elsewhere (the ZLUDA saga is the cautionary tale). Like it or not, the city speaks one language.

Then there is the box itself. NVIDIA does not sell loose parts so much as finished appliances. DGX servers and NVL72 racks, built around Grace + GPU “superchips” (GH200 today, GB200/Blackwell tomorrow), are wired with NVLink and NVSwitch so that eight, sixteen or seventy-two GPUs behave like one big one. Imagine seventy-two chefs making one soup. If they shout across a corridor (plain PCIe and ordinary Ethernet), half the day is spent coordinating. Give them a quiet kitchen - fast, private communication - and dinner is ready sooner. Buyers do not pay for theoretical flops; they pay to finish on Tuesday rather than Friday.

Owning the plumbing turned out to be strategy, not housekeeping. When NVIDIA bought Mellanox, it acquired the city’s transit system: InfiniBand for low-latency links, an AI-tuned flavour of Ethernet called Spectrum-X, and programmable adapters known as BlueField DPUs (with a software kit called DOCA). With the roads in hand, the company can co-design cars and traffic lights. That is hard to rent by the hour.

All of this still needs a place to be built. At the frontier, that place is Taiwan. NVIDIA’s top chips are fabricated at TSMC on custom processes (4N/4NP) and assembled with advanced packaging called CoWoS, which stitches huge dies to stacks of very fast memory. The memory - HBM3E - comes from SK Hynix, Micron and Samsung, but not on a whim: parts must be qualified, and capacity is reserved years ahead. The limiting factor in this boom has often been CoWoS slots and HBM allocation, not bravado. Without those golden tickets, an “H100-killer” remains a handsome rendering.

Who, then, looks capable of building a rival metropolis ? Startup Graphcore tried. A brilliant architecture that struggled to win ecosystem & customers at scale, it was ultimately sold to SoftBank in 2024.
And on the grown-ups side ? We have some cloud landlords and a few chip specialists. Google’s TPUs are tightly woven into its own software mill; AWS pushes Trainium and Inferentia (now Trainium 2) to control cost across a global fleet; Microsoft’s Maia and Cobalt are co-designed with frontier models in mind; Meta’s MTIA leans on the gravity of PyTorch. Among chipmakers, AMD’s MI300/MI325X/MI350 paired with ROCm is the closest on raw silicon and is steadily improving the software; Intel’s Gaudi 3 offers sharp price-per-job in some training and inference, especially for Ethernet-centric shops. Inside China, Huawei’s Ascend 910B/910C rides a home-grown software stack called CANN, a deliberate CUDA alternative for a parallel ecosystem.

Beating NVIDIA, then, is not a single trick but a city plan. You need a developer path that feels native in PyTorch and TensorFlow rather than “ported”. You need racks that scale as one machine, not a suggestion to “use more Ethernet”. You need control over the network - InfiniBand-class links or an AI-tuned Ethernet like Spectrum-X, ideally with offload smarts in the BlueField mould. You need manufacturing booked, not promised: CoWoS capacity at TSMC and HBM3E from the big three, with qualification signed off. And if your migration story is “we’ll just run CUDA elsewhere”, you will have to explain how you navigate the licence.

None of this says NVIDIA is immortal. Cities ossify; fashions change. A rival that offers a familiar software path, rack-scale smoothness, owned plumbing and a guaranteed Taiwanese supply chain could yet siphon tenants. Until then, the premium is not only hype. It is the rent you pay for a place where the streets are paved, the buses run on time and the favourite coffee cart knows your order.