'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { HqAgent } from '@/lib/hq/types'
import { CuteAvatar } from './HqShell'

type Props = {
  agent: HqAgent
  status?: 'idle' | 'working'
  featured?: boolean
  detail?: string
}

export function AgentCard({ agent, status = 'idle', featured = false, detail }: Props) {
  const working = status === 'working'
  return (
    <Link href={`/hq/agents/${agent.id}`}>
      <motion.div
        whileHover={{ y: -6, scale: 1.02 }}
        className={`relative rounded-2xl border p-5 h-full bg-surface-container-low/80 backdrop-blur-sm text-center ${
          working || featured
            ? 'border-primary-container/50 shadow-[0_0_28px_rgb(0_240_255/0.12)]'
            : 'border-outline-variant/20'
        }`}
      >
        {working && (
          <span className="absolute top-3 right-3 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-container" />
          </span>
        )}
        <div className="flex justify-center mb-3">
          <CuteAvatar agentId={agent.id} name={agent.name} size={featured ? 96 : 72} working={working} />
        </div>
        <p className="font-headline font-bold text-lg">{agent.name}</p>
        <p className="text-sm text-primary-container font-label mb-1">{agent.title}</p>
        <p className="text-xs text-on-surface-variant line-clamp-2">{detail || agent.expertise}</p>
        <p className="mt-3 text-xs font-label text-on-surface-variant">
          {working ? 'En mission' : 'Discuter'}
        </p>
      </motion.div>
    </Link>
  )
}
