import { Card, Text, Divider, Group, Badge, Stack } from "@mantine/core";

interface CardProps {
  title: string;
  content: string;
  date: string;
  category: string[];
  onClick: () => void; // Add onClick handler
}

const Cards = ({ title, content, date, category, onClick }: CardProps) => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <Text fw={400} size="lg">
        {title}
      </Text>
      <Divider my="sm" />
      <Text size="sm" c="gray.7" lineClamp={8} style={{ minHeight: 205 }}>
        {content}
      </Text>
      <Stack mt="auto">
        {/* Display categories */}
        <Group gap="xs" mt="10">
          {category.map((cat, index) => (
            <Badge key={index} radius="xs" size="sm">
              {cat}
            </Badge>
          ))}
        </Group>
        {/* Display date */}
        <Text size="xs" c="dimmed">
          {date}
        </Text>
      </Stack>
    </Card>
  );
};

export default Cards;
