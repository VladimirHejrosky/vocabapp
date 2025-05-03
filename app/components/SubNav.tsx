import ReturnButton from './ReturnButton'

interface Props {
    name: string,
    desctiprion?: string,
}

const SubNav = ({name, desctiprion }: Props) => {
  return (
    <div className="flex mb-4 w-full">
    <div className="flex items-center">
      <div className="flex items-center gap-4">
        <ReturnButton />
        <div>
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-muted-foreground">{desctiprion}</p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default SubNav